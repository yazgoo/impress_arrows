function impress_arrows()
{
    function do_skip(item, a)
    {
        classes = []
            do {
                item = a(item);
                classes = item.attr('class').split(' ');
            }
        while(classes.indexOf('skip') != -1)
            return item;
    }
    function get_coordinate(what, name)
    {
        var coordinate = what.attr('data-' + name);
        if(coordinate == undefined) coordinate = '0';
        return parseInt(coordinate);
    }
    function get_coordinates(i)
    {
        next = do_skip($(i), function(a) { return a.next() });
        prev = do_skip($(i), function(a) { return a.prev() });
        xb = get_coordinate(next, 'x');
        xa = get_coordinate(prev, 'x');
        yb = get_coordinate(next, 'y');
        ya = get_coordinate(prev, 'y');
        dx = xb - xa;
        dy = yb - ya;
        l = Math.sqrt(dy * dy + dx * dx) * 0.4
        x = xa + 0.51 * dx;
        y = ya + 0.51 * dy;
        angle = Math.atan2(yb - ya, xb - xa) * (180 / Math.PI);
        return [l, x, y, 'right', Math.floor(angle)];
    }
    this.init = function() {
        $(".arrow").each(function(i) {
            p = get_coordinates(this);
            classes = this.className.split(' ');
            direction = way = '';
            way = p[3];
            direction = 'horizontal';
            what = 'width';
            if($(this).attr('data-x') == undefined) $(this).attr('data-x', p[1])
            if($(this).attr('data-y') == undefined) $(this).attr('data-y', p[2])
            if($(this).attr('data-rotate') == undefined) $(this).attr('data-rotate', p[4])
            css = {}; css[what] = p[0]
            $(this).addClass('step')
            $(this).addClass('skip')
            $(this).css(css)
            html = ['<div class="arrow-body-common arrow-body-'
            + direction + '"></div>',
        '<div class="arrow-end arrow-' +
            way + '"></div>']
            $(this).html(html.join(""))
        })
        $("#descriptions, #impress").children().each(function() {
            if(!this.className.match(/_description$/)) return;
            id = this.className.split("_description")[0];
            style = document.styleSheets[0]
            if(style.cssRules != null) {
            len = style.cssRules.length
            style.insertRule('.impress-on-' + id + ' .' + this.className + " { opacity: 1}", len);
        style.insertRule('.impress-enabled .' + this.className + " { display: block}", len);
        style.insertRule('.' + this.className + " { opacity: 0}", len); }
        $(this).addClass('description')
        })
    }
    this.load_images = function() {
var impress_arrow_i = 0;
$("img").each(
            function(img)
            {
            if(this.src.match(/^arrow:\/\//))
            {
            var page = this.src.split("arrow://")[1]
            var id = 'impress_arrow_' + impress_arrow_i
            var item = $(this).replaceWith('<iframe src=' + page +
                ' width=' + this. width + ' height='
                + this.height + ' frameBorder=0 '+
                'id=' + id + ' ></iframe>');
            impress_arrow_i += 1
            iframe = $('#' + id);
                iframe.after('<br/>' + 
'<a href='+ page + '>view ' + this.title + '</a>')
            }
            });
return this;
    }
    return this;
}
