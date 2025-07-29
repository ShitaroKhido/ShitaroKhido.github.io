import i18next from './i18n.js'

document.addEventListener('DOMContentLoaded', async function () {
  const projectGrid = document.querySelector('.feature-grid')
  const skillGrid = document.querySelector('.skill-grid')
  const searchInput = document.getElementById('search')
  const filterSelect = document.getElementById('filter')
  const langSelect = document.getElementById('lang-select')

  let projects
  let skills

  async function loadContent() {
    try {
      const response = await fetch('data.json')
      const data = await response.json()
      projects = data.projects
      skills = data.skills

      updateUI()
    } catch (error) {
      console.error('Error fetching data:', error)
      projectGrid.innerHTML =
        '<p>Error loading projects. Please try again later.</p>'
    }
  }

  function updateUI() {
    document.title = i18next.t('site.page.title')
    document.querySelector('.logo').textContent = i18next.t('site.logo')
    document.querySelector('nav ul li:nth-child(1) a').textContent =
      i18next.t('site.nav.home')
    document.querySelector('nav ul li:nth-child(2) a').textContent =
      i18next.t('site.nav.about')
    document.querySelector('nav ul li:nth-child(3) a').textContent =
      i18next.t('site.nav.projects')
    document.querySelector('nav ul li:nth-child(4) a').textContent =
      i18next.t('site.nav.contact')
    document.querySelector('.hero h1').dataset.text =
      i18next.t('site.hero.title')
    document.querySelector('.hero p').textContent =
      i18next.t('site.hero.subtitle')
    document.querySelector('.hero .btn').textContent =
      i18next.t('site.hero.button')
    document.querySelector('#projects h2').textContent = i18next.t(
      'site.sections.projects'
    )
    document.querySelector('#about h2').textContent = i18next.t(
      'site.sections.about'
    )
    document.querySelector('#about p').textContent = i18next.t(
      'site.aboutSection.paragraph'
    )
    document.querySelector('#skills h2').textContent = i18next.t(
      'site.sections.skills'
    )
    document.querySelector('#contact h2').textContent = i18next.t(
      'site.sections.contact'
    )
    document.querySelector('input[name="name"]').placeholder = i18next.t(
      'site.contactForm.namePlaceholder'
    )
    document.querySelector('input[name="email"]').placeholder = i18next.t(
      'site.contactForm.emailPlaceholder'
    )
    document.querySelector('textarea[name="message"]').placeholder = i18next.t(
      'site.contactForm.messagePlaceholder'
    )
    document.querySelector('.contact button.btn').textContent = i18next.t(
      'site.contactForm.button'
    )
    document.querySelector('footer p').innerHTML = i18next.t(
      'site.footer.copyright'
    )
    searchInput.placeholder = i18next.t('site.sections.searchPlaceholder')

    populateFilters()
    displayProjects(projects)
    populateSkills()
    updateLangSelector(i18next.language)
  }

  function populateFilters() {
    const allTechnologies = new Set()
    projects.forEach((project) => {
      project.technologies.forEach((tech) => allTechnologies.add(tech))
    })

    filterSelect.innerHTML = `<option value="all">${i18next.t(
      'site.sections.allTechnologies'
    )}</option>`
    allTechnologies.forEach((tech) => {
      const option = document.createElement('option')
      option.value = tech
      option.textContent = tech
      filterSelect.appendChild(option)
    })
  }

  function displayProjects(filteredProjects) {
    projectGrid.innerHTML = ''
    filteredProjects.forEach((project) => {
      const { title, description, technologies, image } = project

      const featureElement = document.createElement('div')
      featureElement.classList.add('feature')

      const imageElement = document.createElement('img')
      imageElement.src = image
      imageElement.alt = title

      const contentElement = document.createElement('div')
      contentElement.classList.add('feature-content')

      const titleElement = document.createElement('h3')
      titleElement.textContent = title

      const descriptionElement = document.createElement('p')
      descriptionElement.textContent = description

      const techListElement = document.createElement('ul')
      techListElement.classList.add('technologies')
      technologies.forEach((tech) => {
        const techElement = document.createElement('li')
        techElement.textContent = tech
        techListElement.appendChild(techElement)
      })

      const projectLinkElement = document.createElement('a')
      projectLinkElement.href = `details.html?id=${project.id}&lang=${i18next.language}`
      projectLinkElement.textContent = i18next.t('site.detailsPage.viewDetails')
      projectLinkElement.classList.add('project-link')

      contentElement.appendChild(titleElement)
      contentElement.appendChild(descriptionElement)
      contentElement.appendChild(techListElement)
      contentElement.appendChild(projectLinkElement)

      featureElement.appendChild(imageElement)
      featureElement.appendChild(contentElement)

      projectGrid.appendChild(featureElement)
    })
  }

  function filterAndSearch() {
    const searchTerm = searchInput.value.toLowerCase()
    const selectedTech = filterSelect.value

    const filteredProjects = projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm)
      const matchesFilter =
        selectedTech === 'all' || project.technologies.includes(selectedTech)
      return matchesSearch && matchesFilter
    })

    displayProjects(filteredProjects)
  }

  function populateSkills() {
    skillGrid.innerHTML = ''
    for (const category in skills) {
      const skillCategoryElement = document.createElement('div')
      skillCategoryElement.classList.add('skill-category')

      const categoryTitleElement = document.createElement('h3')
      categoryTitleElement.textContent = category

      const skillListElement = document.createElement('ul')
      skillListElement.classList.add('skill-tags')
      skills[category].forEach((skill) => {
        const skillItemElement = document.createElement('li')
        skillItemElement.classList.add('skill-tag')
        skillItemElement.textContent = skill
        skillListElement.appendChild(skillItemElement)
      })

      skillCategoryElement.appendChild(categoryTitleElement)
      skillCategoryElement.appendChild(skillListElement)
      skillGrid.appendChild(skillCategoryElement)
    }
  }

  function updateLangSelector(currentLang) {
    langSelect.value = currentLang
  }

  i18next.on('languageChanged', () => {
    updateUI()
  })

  langSelect.addEventListener('change', () => {
    const lang = langSelect.value
    i18next.changeLanguage(lang)
    localStorage.setItem('lang', lang)
  })

  searchInput.addEventListener('input', filterAndSearch)
  filterSelect.addEventListener('change', filterAndSearch)

  loadContent()

  // Contact Form
  const contactForm = document.querySelector('.contact form')
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault()
    alert(i18next.t('site.contactForm.successMessage'))
    contactForm.reset()
  })

  // Mobile Navigation
  const navToggle = document.querySelector('.nav-toggle')
  const nav = document.querySelector('nav')

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('active')
      navToggle.classList.toggle('active')
    })
  }
})
