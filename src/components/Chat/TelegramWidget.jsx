import React, { useEffect } from 'react';

function TelegramWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://comments.app/js/widget.js?3';
    script.setAttribute('data-comments-app-website', 'Q7bEfH3s');
    script.setAttribute('data-limit', '5');
    /*
    script.setAttribute('data-color', 'transparent'); // Puedes personalizar esto
    script.setAttribute('data-dark', '0'); // Puedes cambiar a '1' si quieres modo oscuro
    script.setAttribute('data-width', '100%'); // Ajusta el ancho si es necesario
    */
    document.getElementById('telegram-widget').appendChild(script);
  }, []);

  return <div id="telegram-widget" className="max-w-4xl m-auto p-8 pb-32" />;
}

export default TelegramWidget;
