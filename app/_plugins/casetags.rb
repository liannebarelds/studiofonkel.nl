module Jekyll
  class CaseTagsTag < Liquid::Tag

    def initialize(tag_name, text, tokens)

    end

    def render(context)

      @categories = context.registers[:page]["categories"]
      @output = ''

      for @category in @categories
        @output += "<div class='categories-item'>#{@category}</div>"
      end

      "<div class='categories'>#{@output}</div>"
    end
  end
end

Liquid::Template.register_tag('case_tags', Jekyll::CaseTagsTag)
