module Jekyll
  class ImageTag < Liquid::Tag

    def initialize(tag_name, text, tokens)

      @params = text[1..-3].split('" "')
      @url = @params[0]
      @type = @params[1]
      @description = @params[2]

    end

    def render(context)
      "<div class='image #{@type}'><img src='#{@url}'><div class='image-description'>#{@description}</div></div>"
    end
  end
end

Liquid::Template.register_tag('image', Jekyll::ImageTag)
