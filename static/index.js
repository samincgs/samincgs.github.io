const navbar = document.querySelector('.navbar')
const buttons = document.querySelectorAll('.navbar-items button')
const sections = document.querySelectorAll('section')
const contactSection = document.getElementById('contact')
const projectCards = document.querySelector('.project-cards')
const workCards = document.querySelector('.work-cards')
const personalBtn = document.querySelector('.personal-btn')
const professionalBtn = document.querySelector('.professional-btn')

let projectChoice = 'professional'
const projectsSet = {
  personal: personalProjects,
  professional: workProjects,
}

function smoothToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView()
  }
}

function updateActiveButtons() {
  let current = 0

  for (let i = 0; i < sections.length; i++) {
    const sectionTop = sections[i].offsetTop
    if (scrollY >= sectionTop - 5) {
      current = i
    }
  }

  for (let i = 0; i < buttons.length; i++) {
    if (i === current) {
      buttons[i].classList.add('active')
    } else {
      buttons[i].classList.remove('active')
    }
  }
}

function updateNavbar() {
  let showNavbar = false
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect()
    const absoluteTop = scrollTop + rect.top
    const absoluteBottom = absoluteTop + rect.height

    if (
      (scrollTop >= absoluteTop - 50 && scrollTop <= absoluteTop + 50) ||
      (scrollTop >= absoluteBottom - 50 && scrollTop <= absoluteBottom + 50)
    ) {
      showNavbar = true
    }
  })

  navbar.style.display = showNavbar ? 'block' : 'none'
  navbar.style.position = showNavbar ? 'fixed' : 'absolute'
}

function changingText() {
  spanText = document.querySelector('.changing-text')

  let index = 0

  function showNextQuote() {
    spanText.style.opacity = 0

    setTimeout(() => {
      spanText.innerHTML = selfQuotes[index]
      spanText.style.opacity = 1
      index = (index + 1) % selfQuotes.length
    }, 600)
  }

  spanText.innerHTML = selfQuotes[index]
  spanText.style.opacity = 1
  index++

  setInterval(showNextQuote, 7000)
}

function addProjects(projects) {
  projectCards.innerHTML = ''

  for (let [projectName, projectData] of Object.entries(projects)) {
    const projectCard = `
        <a href=${projectData.url}>
        <div class='project-card'>
            <img src=${projectData.image} class='game-img'>
            <div class='game-info'>
                <span class='game-title'>${projectName}</span>
                <span class='game-description'>${projectData.description}</span>
                <div class='tool-div'>
                    ${projectData.tools
                      .map((tool) => `<span class='game-tag'>${tool}</span>`)
                      .join('')}
                </div>
            </div>
        </div>
        </a>`

    projectCards.innerHTML += projectCard
  }
}

function addWorkExperience(experience) {
  for (let [companyName, workDetails] of Object.entries(experience)) {
    const experience = `
    <div class='work-experience'>
        <img src=${workDetails.image} class='work-img'>
        <span class='work-company-name'>${companyName.toUpperCase()}</span>
        <h4 class='work-role'>${workDetails.role}</h4>
        <div class='work-term'>
            <span class='work-year'>${workDetails.year}</span>
            <span class='work-year'>|</span>
            <span class='work-location'>${workDetails.location}</span>
        </div>
        <p class='work-description'>${workDetails.description}</p>
    </div>
    `

    workCards.innerHTML += experience
  }
}

function updateProjects(choice) {
  if (projectChoice != choice) {
    projectChoice = choice
    addProjects(projectsSet[projectChoice])
  }

  if (projectChoice === 'personal') {
    personalBtn.classList.add('active')
    professionalBtn.classList.remove('active')
  } else {
    professionalBtn.classList.add('active')
    personalBtn.classList.remove('active')
  }
}

// initial calls
changingText()
addWorkExperience(workExperiences)
addProjects(projectsSet[projectChoice])

updateActiveButtons()
updateNavbar()
updateProjects(projectChoice)

window.addEventListener('scroll', updateActiveButtons)
window.addEventListener('scroll', updateNavbar)
