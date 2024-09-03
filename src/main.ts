import './style.css'
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const welcome = document.querySelector('.welcome') as HTMLElement;
        const mainContent = document.getElementById('contents') as HTMLElement;
        const body = document.body;

        if (welcome && mainContent) {
            welcome.classList.add('fadeOut');
            mainContent.classList.remove("fadeIn");
            mainContent.classList.add('contents');

            setTimeout(() => {
                welcome.style.display = 'none';
                body.classList.remove("blockInteract")
            }, 2000);
        }
    }, 1000);
});
window.onload = () => {
    const timeline = document.getElementById('timeline') as HTMLElement;
    const events = document.querySelectorAll('.event') as NodeListOf<HTMLElement>;

    // Fonction pour vérifier si l'élément est visible
    const isInViewport = (elem: HTMLElement) => {
        const rect = elem.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    const handleScroll = () => {
        if (isInViewport(timeline)) {
            // Déclenche l'animation si l'élément est visible
            timeline.style.width = '1000px';

            setTimeout(() => {
                events.forEach(event => event.style.opacity = '1');
            }, 900);

            // Une fois l'animation déclenchée, on retire l'écouteur pour ne pas la relancer
            window.removeEventListener('scroll', handleScroll);
        }
    };

    // Ajoute l'écouteur d'événement au défilement
    window.addEventListener('scroll', handleScroll);
};