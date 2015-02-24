module Jekyll
  class ImageTag < Liquid::Tag

    def initialize(tag_name, text, tokens)

      @params = text.split('" "')
      @url = @params[0]
      @frame = @params[1]
      @description = @params[2]

    end

    def render(context)
      "<div class='image #{@frame}'><img src='#{@url}'></div>"
    end
  end
end

Liquid::Template.register_tag('image', Jekyll::ImageTag)
