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
    window.scroll(0, 0);
    setTimeout(() => {
        const timeline = document.getElementById('timeline') as HTMLElement;
        const events = document.querySelectorAll('.event') as NodeListOf<HTMLElement>;
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
                timeline.style.width = '100%';
                timeline.classList.add('expanded');
                setTimeout(() => {
                    events.forEach(event => event.style.opacity = '1');
                }, 900);
                window.removeEventListener('scroll', handleScroll);
            }
        };
        window.addEventListener('scroll', handleScroll);
    }, 3000);

    const detailsElements = document.querySelectorAll('details');

    detailsElements.forEach(details => {
        details.addEventListener('mouseover', () => {
            if (!details.hasAttribute('open')) {
                details.setAttribute('open', 'true');
                const content = details.querySelector('summary ~ *') as HTMLElement;
                if (content) {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            }
        });

        details.addEventListener('mouseout', () => {
            if (details.hasAttribute('open')) {
                const content = details.querySelector('summary ~ *') as HTMLElement;
                if (content) {
                    content.style.maxHeight = '0';
                    setTimeout(() => details.removeAttribute('open'), 500);
                }
            }
        });
    });
};