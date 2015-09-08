(function () {
  var $ls = document.getElementById('J_LoadStatus');
  log('loading music...');

  function log(opt) {
    if (typeof opt === 'string') { opt = {content: opt}; }
    extend({
      tag: 'span',
      color: 'blue',
      content: '',
      tail: '<br/>'
    }, opt);
    $ls.innerHTML += '<' + opt.tag + ' style="color:' + opt.color + ';">' + opt.content + '</' + opt.tag + '>' + opt.tail;
  }

  function extend(src, aim) {
    for (var key in src) (key in aim) || (aim[key] = src[key]);
    return aim;
  }

  MIDI.loadPlugin({
    instruments: ['acoustic_grand_piano'],
    onsuccess: function() {

      log('loaded.');

      MIDI.setVolume(0, 127);

      play({note: 50});
      play({note: 50, delay: 2, length: 0.25});
      play({note: 50, delay: 2.25, length: 0.25});
      play({note: 50, delay: 2.5, length: 1});

      function play(opt) {
        extend({
          base: 0,
          note: 0,
          velocity: 100,
          length: 1,
          delay: 0
        }, opt);
        MIDI.noteOn(opt.base, opt.note, opt.velocity, opt.delay);
        MIDI.noteOff(opt.base, opt.note, opt.delay + opt.length);
      }

    }
  });
})();