import React from "react"
import $ from 'jquery' // important: case sensitive.
import ScaleText from 'react-scale-text'

import patron from '../images/become-a-patron-button@2x.png'


class ComingSoon extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
    $.fn.stretch_text = function () {
      console.log("stretching...")
      var elmt = $(this),
      cont_width = elmt.width(),
      txt = elmt.html();

      if (elmt.find('.stretch_it').length > 0) {
        txt = elmt.find('.stretch_it').html();
        elmt.html(txt);
      }

      var one_line = $('<span class="stretch_it logo">' + txt + '</span>'),
      nb_char = elmt.text().length,
      spacing = cont_width / nb_char,
      txt_width;

      elmt.html(one_line);
      txt_width = one_line.width();

      var char_width = txt_width / nb_char,
      ltr_spacing = spacing - char_width + (spacing - char_width) / nb_char;

      if (ltr_spacing < 0) {
        ltr_spacing = 0;
      }

      one_line.css({'letter-spacing': ltr_spacing});
    };

    this.setState({
      intervalId: null,
    })

    this.run_preloader();
  }

  run_preloader () {
    var inc = 350,
        p = $('p.loading-text'),
        preloader = $('.preloader');

    let intervalId = setInterval(function(){
      var len = p.children('span').length, i = 0;
      for (i; i < len; i++) {
        if (!$(p.children('span')[i]).hasClass('load-letter')) {
          $(p.children('span')[i]).addClass('load-letter');
          return false;
        }
      }

      if ($('.load-letter').length === p.children('span').length) {

        setTimeout(function () {
          p.next('p').addClass('is-loaded');
        });


        //set fs height
        this.set_fs_height();

        setTimeout(function () {
          clearInterval(this.state.intervalId);

          $('.stretch-text').each(function(){
            if (!$(this).hasClass('ls-set')) {
              $(this).addClass('ls-set');
              $(this).stretch_text();
            }
          });

          preloader.fadeOut('slow', function(){
            $(this).remove();
          });
        }.bind(this) , (350*4));
      }
    }.bind(this), 350);
    this.setState({ intervalId: intervalId })
  }

  set_fs_height () {
    var body = $('body');
    if ($(window).width() <= 736) {
      if ($(window).height() < body.height()) {
        body.css('height', 'auto');
      } else {
        body.css('height', '100vh');
      }
    }
  }

  handleSubmit(event) {
    window.open('https://tinyletter.com/joyrats', 'popupwindow', 'scrollbars=yes,width=800,height=600')
    return true
  }

  render() {
    return (
      <>
        <div className="preloader preloader-xl">
          <div>
            <p className="loading-text">
              <span className="logo">J</span>
              <span className="logo">O</span>
              <span className="logo">Y</span>
              <span className="logo">R</span>
              <span className="logo">A</span>
              <span className="logo">T</span>
              <span className="logo">S</span>
            </p>
            <p>is loading</p>
          </div>
        </div>

        <section id="fullscreen" className="fs-coming-soon">
          <div>
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <h3>Coming Soon</h3>
                  <h1 className="stretch-text">
                    <span className="stretch_it logo">JOYRATS</span>
                  </h1>
                  <h2>Brooklyn Art Collective</h2>
                </div>
                <div className="col-lg-6">
                  <form className="sub-form" method="post" action="https://tinyletter.com/joyrats" target="popupwindow" onSubmit={this.handleSubmit}>
                    <h4 className="tinyletter">Join Our TinyLetter</h4>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" className="form-control" id="name" name="name" placeholder="Your name" />
                      <label htmlFor="tlemail">Email</label>
                      <input type="email" className="form-control" id="tlemail" name="email" placeholder="Your email" />
                    </div>
                    <div className="text-right">
                      <input type="hidden" value="1" name="embed"/>
                      <button type="submit" className="btn btn-primary">Subscribe</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <p className="copyleft">
            <a target="_blank" href="https://www.patreon.com/join/joyrats?">
              <img src={patron} className="btn-patreon" alt="Become a Patron" />
            </a>
          </p>
          <p className="coming-soon-copyright">
            © {new Date().getFullYear()} JOYRATS
          </p>
        </section>
      </>
    )
  }
}

export default ComingSoon
