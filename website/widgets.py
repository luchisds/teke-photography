from django import forms
from django.utils import six
from django.forms.utils import flatatt
from django.utils.html import mark_safe

from taggit.models import Tag
from taggit.utils import edit_string_for_tags


# Based on Django-Taggit-Labels (https://github.com/bennylope/django-taggit-labels)
class LabelTagWidget(forms.TextInput):

	#Change input field type to hidden will hide all, but with is_hidden property make visible the buttons
	input_type = 'hidden'
	#Set Tag model
	model = Tag

	@property
	def is_hidden(self):
		return False

	def tag_list(self, tags):
		"""
		Generates a list of tags identifying those previously selected.
		Returns a list of tuples of the form (<tag name>, <CSS class name>).
		Uses the string names rather than the tags themselves in order to work
		with tag lists built from forms not fully submitted.
		"""
		return [(tag.name, 'selected taggit-tag' if tag.name in tags else 'taggit-tag')
			for tag in self.model.objects.all()]

	def format_value(self, value):
		if value is not None and not isinstance(value, six.string_types):
			value = edit_string_for_tags([o.tag for o in value.select_related("tag")])
		return value

	def render(self, name, value, attrs={}):
		# Case in which a new form is dispalyed
		if value is None:
			current_tags = []
			formatted_value = ""
			selected_tags = self.tag_list([])
		# Case in which a form is displayed with submitted but not saved
		# details, e.g. invalid form submission
		elif isinstance(value, six.string_types):
			current_tags = [tag.strip(" \"") for tag in value.split(",") if tag]
			formatted_value = value
			selected_tags = self.tag_list(current_tags)
		# Case in which value is loaded from saved tags
		else:
			current_tags = [o.tag for o in value.select_related("tag")]
			formatted_value = self.format_value(value)
			selected_tags = self.tag_list([t.name for t in current_tags])

		input_field = super(LabelTagWidget, self).render(name, formatted_value, attrs)

		if attrs.get('class') is None:
			attrs.update({'class': 'taggit-labels taggit-list'})
		list_attrs = flatatt(attrs)

		tag_li = "".join([u"<li data-tag-name='{0}' class='{1}'>{0}</li>".format(tag[0], tag[1]) for tag in selected_tags])
		tag_ul = u"<ul{0}>{1}</ul>".format(list_attrs, tag_li)
		return mark_safe(u"{0}{1}".format(tag_ul, input_field))

	class Media:
		css = {
			'all': ('admin/tag-widget/tag-widget.css',)
		}
		js = ('admin/tag-widget/tag-widget.js',)
