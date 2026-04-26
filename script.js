          tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            DEFAULT: '#E50914',
                            hover: '#B81D24',
                            dark: '#831010'
                        },
                        surface: {
                            DEFAULT: '#18181B',
                            light: '#27272A'
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                    }
                }
            }
        }
  
  'use strict';

        const moviesDatabase = [
            {
                id: "mov-001",
                title: "Authentic Games: O Filme",
                image: "imgs/authenticgames.jpg",
                synopsis: "Prepare-se para mergulhar numa aventura épica no mundo dos blocos. Acompanhe a jornada emocionante de coragem, amizade e muita criatividade onde os limites da construção são testados contra uma nova e obscura ameaça.",
                releaseDate: "12 de Outubro de 2026",
                duration: "95 Minutos"
            },
            {
                id: "mov-002",
                title: "The Backrooms",
                image: "imgs/backrooms.jpg",
                synopsis: "Um terror psicológico intenso e perturbador. Presos num labirinto infinito de salas com carpetes húmidas e luzes fluorescentes zumbindo, um grupo tenta descobrir se a saída é real ou apenas um mito cruel.",
                releaseDate: "31 de Outubro de 2026",
                duration: "110 Minutos"
            },
            {
                id: "mov-003",
                title: "The Amazing Digital Circus",
                image: "imgs/digitalcircus.jpg",
                synopsis: "Ninguém sabe como lá chegaram, ninguém sabe como sair. Presos numa realidade virtual bizarra e vibrante, seis humanos tentam manter a sua sanidade enquanto são forçados a participar no show mais caótico do universo.",
                releaseDate: "25 de Dezembro de 2026",
                duration: "85 Minutos"
            }
        ];

        const domElements = {
            grid: document.getElementById('moviesGrid'),
            modal: document.getElementById('movieModal'),
            backdrop: document.getElementById('modalBackdrop'),
            closeBtn: document.getElementById('modalCloseBtn'),
            title: document.getElementById('modalTitle'),
            synopsis: document.getElementById('modalSynopsis'),
            date: document.getElementById('modalDate'),
            duration: document.getElementById('modalDuration')
        };

        function fallbackImage(imgElement) {
            imgElement.src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800';
            imgElement.onerror = null; 
        }

        function createCardElement(movieData) {
            const article = document.createElement('article');
            article.className = 'bg-surface-light rounded-2xl overflow-hidden shadow-xl border border-zinc-800 flex flex-col h-full group hover:-translate-y-2 transition-transform duration-300';

            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'relative w-full h-80 overflow-hidden bg-zinc-900';

            const img = document.createElement('img');
            img.src = movieData.image;
            img.alt = movieData.title;
            img.className = 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100';
            img.onerror = () => fallbackImage(img);

            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'p-6 flex flex-col flex-grow';

            const title = document.createElement('h3');
            title.className = 'text-xl font-bold text-white mb-6 line-clamp-2';
            title.textContent = movieData.title;

            const spacer = document.createElement('div');
            spacer.className = 'flex-grow';

            const actionBtn = document.createElement('button');
            actionBtn.className = 'w-full bg-zinc-800 hover:bg-brand text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface';
            actionBtn.textContent = 'Ver detalhes';
            actionBtn.onclick = () => openMovieDetails(movieData.id);

            imgWrapper.appendChild(img);
            contentWrapper.appendChild(title);
            contentWrapper.appendChild(spacer);
            contentWrapper.appendChild(actionBtn);

            article.appendChild(imgWrapper);
            article.appendChild(contentWrapper);

            return article;
        }

        function initializeMovies() {
            if (!domElements.grid) return;
            
            moviesDatabase.forEach(movie => {
                const card = createCardElement(movie);
                domElements.grid.appendChild(card);
            });
        }

        function openMovieDetails(movieId) {
            const selectedMovie = moviesDatabase.find(m => m.id === movieId);
            if (!selectedMovie) return;

            domElements.title.textContent = selectedMovie.title;
            domElements.synopsis.textContent = selectedMovie.synopsis;
            domElements.date.textContent = selectedMovie.releaseDate;
            domElements.duration.textContent = selectedMovie.duration;

            domElements.modal.classList.remove('hidden');
            domElements.modal.classList.add('flex');
            document.body.style.overflow = 'hidden'; 
        }

        function closeMovieDetails() {
            domElements.modal.classList.add('hidden');
            domElements.modal.classList.remove('flex');
            document.body.style.overflow = '';
        }

        domElements.closeBtn.addEventListener('click', closeMovieDetails);
        domElements.backdrop.addEventListener('click', closeMovieDetails);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !domElements.modal.classList.contains('hidden')) {
                closeMovieDetails();
            }
        });

        document.addEventListener('DOMContentLoaded', initializeMovies);