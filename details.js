import i18next from './i18n.js'

document.addEventListener('DOMContentLoaded', async () => {
  const projectDetailContainer = document.getElementById(
    'project-detail-container'
  )
  const commentsList = document.getElementById('comments-list')
  const commentForm = document.getElementById('comment-form')
  const commentAuthor = document.getElementById('comment-author')
  const commentText = document.getElementById('comment-text')
  const langSelect = document.getElementById('lang-select')

  const params = new URLSearchParams(window.location.search)
  const projectId = parseInt(params.get('id'))
  let currentLang = params.get('lang') || localStorage.getItem('lang') || 'en'

  async function loadContent() {
    try {
      const response = await fetch('data.json')
      const data = await response.json()
      const projects = data.projects
      const project = projects.find((p) => p.id === projectId)

      updateUI(project)
    } catch (error) {
      console.error('Error fetching project data:', error)
      projectDetailContainer.innerHTML = `<p>${i18next.t(
        'site.detailsPage.errorLoading'
      )}</p>`
    }
  }

  function updateUI(project) {
    document.title = project
      ? `${project.title} | ${i18next.t('site.title')}`
      : `${i18next.t('site.detailsPage.projectNotFound')} | ${i18next.t(
          'site.title'
        )}`
    document.querySelector('.logo').textContent = i18next.t('site.logo')
    document.querySelector('nav ul li a').textContent = i18next.t(
      'site.nav.home'
    )
    document.querySelector('.go-back-btn').textContent = i18next.t(
      'site.detailsPage.goBack'
    )
    document.querySelector('#comments-section h2').textContent = i18next.t(
      'site.detailsPage.comments'
    )
    commentAuthor.placeholder = i18next.t(
      'site.detailsPage.commentForm.namePlaceholder'
    )
    commentText.placeholder = i18next.t(
      'site.detailsPage.commentForm.commentPlaceholder'
    )
    document.querySelector('#comment-form button').textContent = i18next.t(
      'site.detailsPage.commentForm.button'
    )

    if (project) {
      projectDetailContainer.innerHTML = `
        <article class="project-detail">
          <h1>${project.title}</h1>
          <img src="${project.image}" alt="${project.title}" />
          <p>${project.description}</p>
          <h3>Technologies Used:</h3>
          <ul>
            ${project.technologies
              .map((tech) => `<li>${tech}</li>`)
              .join('')}
          </ul>
          <a href="${project.link}" target="_blank">View Project</a>
        </article>
      `
    } else {
      projectDetailContainer.innerHTML = `<p>${i18next.t(
        'site.detailsPage.projectNotFound'
      )}</p>`
    }

    // Comments functionality
    let comments =
      JSON.parse(localStorage.getItem(`comments_${projectId}`)) || []

    function displayComments() {
      commentsList.innerHTML = ''
      comments.forEach((comment) => {
        const commentElement = document.createElement('div')
        commentElement.classList.add('comment')
        commentElement.innerHTML = `
          <p>${comment.text}</p>
          <p class="author">- ${comment.author}</p>
        `
        commentsList.appendChild(commentElement)
      })
    }

    commentForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const newComment = {
        author: commentAuthor.value,
        text: commentText.value,
      }
      comments.push(newComment)
      localStorage.setItem(`comments_${projectId}`, JSON.stringify(comments))
      displayComments()
      commentForm.reset()
    })

    displayComments()
    updateLangSelector(i18next.language)
  }

  function updateLangSelector(currentLang) {
    langSelect.value = currentLang
  }

  i18next.on('languageChanged', () => {
    loadContent()
  })

  langSelect.addEventListener('change', () => {
    const lang = langSelect.value
    i18next.changeLanguage(lang)
    localStorage.setItem('lang', lang)
  })

  i18next.changeLanguage(currentLang, loadContent)
})
