import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const welcome = document.querySelector('.welcome') as HTMLElement | null;
        const mainContent = document.getElementById('contents') as HTMLElement | null;
        const body = document.body;

        if (welcome && mainContent) {
            welcome.classList.add('fadeOut');
            mainContent.classList.remove("fadeIn");
            mainContent.classList.add('contents');

            setTimeout(() => {
                welcome.style.display = 'none';
                body.classList.remove("blockInteract");
            }, 2000);
        }
    }, 1000);

    const mainButton = document.getElementById("main-button") as HTMLButtonElement | null;
    const secondButton = document.getElementById("second-button") as HTMLButtonElement | null;
    const thirdButton = document.getElementById("third-button") as HTMLButtonElement | null;
    const fourButton = document.getElementById("four-button") as HTMLButtonElement | null;

    const mainSkills = document.getElementById("main-skills-list") as HTMLDivElement | null;
    const secondSkills = document.getElementById("second-skills-list") as HTMLDivElement | null;
    const thirdSkills = document.getElementById("third-skills-list") as HTMLDivElement | null;
    const fourSkills = document.getElementById("four-skills-list") as HTMLDivElement | null;

    if (mainButton && secondButton && thirdButton && fourButton && mainSkills && secondSkills && thirdSkills && fourSkills) {
        function showSkills(selected: HTMLElement, ...toHide: HTMLElement[]) {
            selected.classList.add("show");
            toHide.forEach(hide => hide.classList.remove("show"));
        }

        const buttons = [mainButton, secondButton, thirdButton, fourButton];

        buttons.forEach((button, index) => {
            button!.addEventListener('click', function () {
                button.classList.add('active');

                setTimeout(() => {
                    button.classList.remove('active');
                }, 100);

                showSkills(
                    [mainSkills, secondSkills, thirdSkills, fourSkills][index]!,
                    ...[mainSkills, secondSkills, thirdSkills, fourSkills].filter((_, i) => i !== index)
                );
            });
        });
    } else {
        console.error('Un des boutons ou des listes de compétences est manquant');
    }
});

window.onload = () => {
    window.scroll(0, 0);
    const span = document.querySelector('.main-text');
    const texts = ["Back-End", "Front-End"];
    let currentText = 0;
    let i = 0;
    let isDeleting = false;

    if (span) {
        const typeWriterEffect = () => {
            const text = texts[currentText];

            if (!isDeleting) {
                span.innerHTML = text.slice(0, i);
                i++;
                if (i > text.length) {
                    isDeleting = true;
                    setTimeout(typeWriterEffect, 2000);
                    return;
                }
            } else {
                span.innerHTML = text.slice(0, i);
                i--;
                if (i < 0) {
                    setTimeout(() => {
                        currentText = (currentText + 1) % texts.length;
                        isDeleting = false;
                        i = 0;
                        typeWriterEffect();
                    }, 1000);
                    return;
                }
            }

            setTimeout(typeWriterEffect, isDeleting ? 250 : 150);
        };

        typeWriterEffect();
    }

    let lastScrollTop = 0;
    const menu = document.querySelector('.menu') as HTMLElement | null;

    if (menu) {
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop) {
                menu.classList.add('hidden');
            } else {
                menu.classList.remove('hidden');
            }

            lastScrollTop = scrollTop;
        });
    }

    setTimeout(() => {
        const timeline = document.getElementById('timeline') as HTMLElement | null;
        const events = document.querySelectorAll('.event') as NodeListOf<HTMLElement>;
        const progressBars = document.querySelectorAll('.progressbar') as NodeListOf<HTMLElement>;

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
            if (timeline && isInViewport(timeline)) {
                timeline.style.width = '100%';
                timeline.classList.add('expanded');
                setTimeout(() => {
                    events.forEach(event => event.style.opacity = '1');
                }, 900);
            }

            progressBars.forEach((progressBar) => {
                const value = progressBar.getAttribute('data-value');
                if (value && isInViewport(progressBar)) {
                    progressBar.style.width = value + '%';
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
    }, 3000);
};
