module Jekyll
  class ScrollImageTag < Liquid::Tag

    def initialize(tag_name, text, tokens)

      @params = text.split(' ')
      @url = @params[0]
      @frame = @params[1]

    end

    def render(context)
      "<div class='scrollimage #{@frame}'><img src='#{@url}'></div>"
    end
  end
end

Liquid::Template.register_tag('scrollimage', Jekyll::ScrollImageTag)
