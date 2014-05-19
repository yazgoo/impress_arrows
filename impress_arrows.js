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
function get_radius(a)
{
    radius = (1.0 * (a.clientWidth < a.clientHeight ?
        a.clientHeight : a.clientWidth)) / 2
    console.log(a.clientWidth, a.clientHeight, radius);
    return radius;
}
function get_coordinates(i)
{
    next = do_skip($(i), function(a) { return a.next() });
    prev = do_skip($(i), function(a) { return a.prev() });
    console.log(next);
    console.log(prev);
    xb = parseInt(next.attr('data-x'));
    xa = parseInt(prev.attr('data-x'));
    yb = parseInt(next.attr('data-y'));
    ya = parseInt(prev.attr('data-y'));
    dx = xb - xa;
    dy = yb - ya;
    l = Math.abs((dx == 0 ? dy : dx) * 0.4);
    x = xa + dx / 2;
    y = ya + dy / 2;
    /* lets compute the middle */
    /*
       ra = get_radius(prev[0]);
    rb = get_radius(next[0]);
    D = Math.sqrt(dy * dy + dx * dx);
    d = (D - ra - rb) / 2;
    x = ((ra + d) / D) * dx + xa; 
    y = ((ra + d) / D) * dy + ya; 
    l = Math.abs(2 * d);
    */
    direction = Math.abs(dy) > 0 ? (dy > 0 ? 'down' : 'up') : (dx > 0 ? 'right' : 'left')
    return [l, x, y, direction];
}
$(".arrow").each(function(i) {
        p = get_coordinates(this);
        classes = this.className.split(' ')
        direction = way = ''
        if(classes.indexOf('right') != -1) { way = 'right' }
        else if(classes.indexOf('down') != -1) { way = 'down' }
        else if(classes.indexOf('up') != -1) { way = 'up' }
        else way = p[3];
        direction = way == "up" || way == "down" ? 'vertical' : 'horizontal'
        what = direction == 'horizontal' ? 'width' : 'height'
        //p = $(this).attr('p').split(',')
        if($(this).attr('data-x') == undefined) $(this).attr('data-x', p[1])
        if($(this).attr('data-y') == undefined) $(this).attr('data-y', p[2])
        css = {}; css[what] = p[0]
        $(this).addClass('step')
        $(this).addClass('skip')
        $(this).css(css)
        html = ['<div class="arrow-body-common arrow-body-' + direction + '"></div>', '<div class="arrow-end arrow-' + way + '"></div>']
        if(way == 'left' || way == 'up') html.reverse()
        $(this).html(html.join(""))
        })
$("#driver_process").on("impress:stepenter", function(e) {
            $("#udev").nextAll(".arrow").hide()
        })
$("#udev").on("impress:stepenter", function(e) {
            $("#driver_process").nextAll(".arrow").hide()
            $("#udev").nextAll(".arrow").show()
            $("#ls").nextAll(".arrow").hide()
        })
$("#ls").on("impress:stepenter", function(e) {
            $("#driver_process").nextAll(".arrow").hide()
            $("#ls").nextAll(".arrow").show()
            $("#driver_process2").nextAll(".arrow").hide()
        })
$("#driver_process2").on("impress:stepenter", function(e) {
            $("#ls").nextAll(".arrow").hide()
            $("#driver_process2").nextAll(".arrow").show()
        })
$("#descriptions").children().each(function() {
        id = this.className.split("_description")[0];
        style = document.styleSheets[0]
        len = style.cssRules.length
        style.insertRule('.impress-on-' + id + ' .' + this.className + " { opacity: 1}", len);
        style.insertRule('.impress-enabled .' + this.className + " { display: block}", len);
        style.insertRule('.' + this.className + " { opacity: 0}", len);
        $(this).addClass('description')
        })

