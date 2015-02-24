module Jekyll
  class CaseTagsTag < Liquid::Tag

    def initialize(tag_name, text, tokens)

    end

    def render(context)

      @categories = context.registers[:page]["categories"].split(" ")
      @output = ''

      for @category in @categories
        @output += "<div class='case-categories-tag'>#{@category}</div>"
      end

      "<div class='case-categories'>#{@output}</div>"
    end
  end
end

Liquid::Template.register_tag('case_tags', Jekyll::CaseTagsTag)
