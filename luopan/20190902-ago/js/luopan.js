function TenLine(t) {
  (this.element_id = t.element_id),
    (this.w_id = t.w_id),
    (this.h_id = t.h_id),
    (this.color_code = t.color_code),
    (this.w_win = window.innerWidth),
    (this.h_win = window.innerHeight),
    (this.stroke_width = t.stroke_width),
    (this.w_svg = 0),
    (this.h_svg = 0),
    (this.reset_tenline = function() {
      var t = window.innerWidth - 15,
        e = window.innerHeight - 15;
      console.log('w_svg=', t),
        console.log('h_svg=', e),
        (this.w_svg = t),
        (this.h_svg = e);
      var i = 'stroke:#0080ff;stroke-width:1;';
      (i = ''),
        void 0 !== this.color_code && (i += 'stroke:' + this.color_code + ';'),
        void 0 !== this.stroke_width &&
          (i += 'stroke-width:' + this.stroke_width + ';');
      var n = document.querySelector('#' + this.element_id),
        o = document.querySelector('#' + this.w_id),
        s = document.querySelector('#' + this.h_id);
      n.setAttribute('width', t + 'px'),
        n.setAttribute('height', e + 'px'),
        o.setAttribute('style', i),
        o.setAttribute('x1', '0'),
        o.setAttribute('y1', '50%'),
        o.setAttribute('x2', '100%'),
        o.setAttribute('y2', '50%'),
        s.setAttribute('style', i),
        s.setAttribute('x1', '50%'),
        s.setAttribute('y1', '0'),
        s.setAttribute('x2', '50%'),
        s.setAttribute('y2', '100%');
    }),
    (this.element = function() {
      return document.querySelector('#' + element_id);
    });
}
function Luopan(t) {
  (this.src =
    'http://res.cloudinary.com/cn27529/image/upload/v1523242966/luopan-02_slkj2y.png'),
    (this.w_luopan = window.innerWidth - 20),
    (this.h_luopan = window.innerHeight - 20),
    (this.element_id = t.element_id),
    (this.deg_number = 0),
    (this.set_transform = function(t) {
      'left' === t.move
        ? (this.deg_number -= t.number)
        : (this.deg_number += t.number);
      var e = 'rotate(' + this.deg_number + 'deg)';
      document.querySelector('#' + this.element_id).style.transform = e;
    }),
    (this.element = function() {
      return document.querySelector('#' + this.element_id);
    }),
    (this.set_src = function() {}),
    (this.reset_luopan = function() {
      ((n = document.querySelector('#' + this.element_id)).src = this.src),
        (this.w_luopan = window.innerWidth - 30),
        (this.h_luopan = window.innerHeight - 30);
      var t = 0;
      this.h_luopan >= this.w_luopan &&
        ((this.h_luopan = this.w_luopan), (t = this.w_luopan)),
        this.w_luopan >= this.h_luopan && (this.w_luopan = this.h_luopan);
      var e = 0,
        i = 0;
      window.innerWidth >= window.innerHeight &&
        ((t = window.innerHeight - 30),
        (e = ((e = window.innerWidth - window.innerHeight) + 17) / 2),
        (i = 8)),
        window.innerWidth <= window.innerHeight &&
          ((t = window.innerWidth - 30),
          (e = ((e = window.innerWidth - this.w_luopan) - 12) / 2),
          (i = ((i = window.innerHeight - window.innerWidth) + 15) / 2)),
        n.setAttribute('width', t + 'px');
      var n,
        o =
          'border: 0px solid #000000; position: absolute; z-index: -999; top: ' +
          i +
          'px; left: ' +
          e +
          'px;';
      (n = document.querySelector('#' + this.element_id)).setAttribute(
        'style',
        o
      ),
        console.log('window.innerWidth=', window.innerWidth),
        console.log('window.innerHeight=', window.innerHeight),
        console.log('luopan my_style=', o),
        console.log('w_luopan=', this.w_luopan),
        console.log('h_luopan=', this.h_luopan);
    });
}
