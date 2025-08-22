const navbar = document.querySelector('.navbar')
const buttons = document.querySelectorAll('.navbar-items button')
const sections = document.querySelectorAll('section')
const projectsCard = document.querySelector('.project-cards')

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

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect()

    if (
      rect.bottom <= window.innerHeight + 85 &&
      rect.bottom >= window.innerHeight - 85
    ) {
      showNavbar = true
    }
  })

  if (showNavbar) {
    navbar.style.position = 'fixed'
  } else {
    navbar.style.position = 'absolute'
  }
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
  //fix
  projectsCard.innerHTML = ''

  Object.entries(projects).forEach(([projectName, projectData]) => {
    const a = document.createElement('a')
    a.href = projectData.url

    const projectCard = document.createElement('div')
    projectCard.classList.add('project-card')

    const img = document.createElement('img')
    img.src = projectData.image
    img.classList.add('game-img')
    projectCard.appendChild(img)

    const gameInfo = document.createElement('div')
    gameInfo.classList.add('game-info')
    projectCard.append(gameInfo)

    const title = document.createElement('span')
    title.classList.add('game-title')
    title.innerHTML = projectName
    gameInfo.appendChild(title)

    const description = document.createElement('span')
    description.classList.add('game-description')
    description.innerHTML = projectData.description
    gameInfo.appendChild(description)

    const toolDiv = document.createElement('div')
    toolDiv.classList.add('tool-div')
    for (let tool of projectData.tools) {
      const toolTags = document.createElement('span')
      toolTags.classList.add('game-tag')
      toolTags.innerHTML = tool
      toolDiv.appendChild(toolTags)
    }

    gameInfo.appendChild(toolDiv)
    a.appendChild(projectCard)
    projectsCard.appendChild(a)
  })
}

function updateProjects(choice) {
  if (projectChoice != choice) {
    projectChoice = choice
    addProjects(projectsSet[projectChoice])
  }
}

// initial calls
changingText()
addProjects(projectsSet[projectChoice])
updateActiveButtons()
updateNavbar()

window.addEventListener('scroll', updateActiveButtons)
window.addEventListener('scroll', updateNavbar)
