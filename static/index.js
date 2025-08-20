const navbar = document.querySelector('.navbar')
const buttons = document.querySelectorAll('.navbar-items button')
const sections = document.querySelectorAll('section')
const project_cards = document.querySelector('.project-cards')

let projectChoice = 'professional'

const quotes = [
  'Software developer with over 4 years of experience building software solutions. My expertise includes Python, JavaScript, and more.',
  'Experienced software developer with 4+ years in creating software solutions. Skilled in Python, JavaScript, and other technologies.',
  'I am a software developer with over 4 years of experience, specializing in Python, JavaScript, and building efficient software solutions.',
]

const workDetails = {
  osc: {
    name: 'Ontario Science Centre',
    role: 'Data Analyst',
    work_period: ['Jan 2025', 'Dec 2025'],
    description: '',
    tools: [
      'Power Platform',
      'Excel',
      'PowerBI',
      'SQL',
      'Python',
      'HTML',
      'CSS',
    ],
  },
  tbs: {
    name: 'Treasury Board Secretiat',
    role: 'Business Finance Analyst',
    work_period: ['Jan 2024', 'Apr 2024'],
    description: '',
    tools: ['Excel', 'Planview'],
  },
  wi: {
    name: 'WiConnect',
    role: 'Junior IT Support',
    work_period: ['Jan 2020', 'May 2020'],
    description: '',
    tools: ['Excel'],
  },
}

const personal_projects = {
  'Persona Notepad': {
    description:
      'A notepad that mixes my favorite coding language with my favorite game',
    tools: ['Python', 'Tkinter', 'Pillow', 'PyAudio'],
    image: 'images/persona-notepad.png',
    url: 'https://github.com/samincgs/persona-notepad',
  },
  '2D Adventure Game': {
    description: 'An Old School Pokemon Style RPG game.',
    tools: ['Python', 'Pygame', 'JSON'],
    image: 'images/2dadventuregame.png',
    url: 'https://github.com/samincgs/2DAdventure',
  },

  'Chess Engine': {
    description: 'A Chess Engine',
    tools: ['Python', 'Pygame'],
    image: 'images/chess.png',
    url: 'https://github.com/samincgs/chess',
  },
}

const work_projects = {
  'Netflix Show Release Trend Analysis': {
    description:
      'A notepad that mixes my favorite coding language with my favorite game',
    tools: ['Excel', 'SQL', 'Python', 'Pandas', 'Matplotlib', 'Scikit-Learn'],
    image: 'images/netflix_trend.png',
    url: 'https://github.com/samincgs/netflix-show-release-trend-analysis',
  },
  'Loan Repayment Factors Analysis': {
    description:
      'A notepad that mixes my favorite coding language with my favorite game',
    tools: ['Excel', 'Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scipy'],
    image: 'images/loan_repayment.png',
    url: 'https://github.com/samincgs/netflix-show-release-trend-analysis',
  },
  Quill: {
    description:
      'A notepad that mixes my favorite coding language with my favorite game',
    tools: ['Python', 'Flask', 'MongoDB', 'HTML', 'CSS', 'JavaScript'],
    image: 'images/quill.png',
    url: 'https://github.com/samincgs/quill',
  },
}

projects_set = {
  personal: personal_projects,
  professional: work_projects,
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
  span_text = document.querySelector('.changing-text')

  let index = 0

  function showNextQuote() {
    span_text.style.opacity = 0

    setTimeout(() => {
      span_text.innerHTML = quotes[index]
      span_text.style.opacity = 1
      index = (index + 1) % quotes.length
    }, 600)
  }

  span_text.innerHTML = quotes[index]
  span_text.style.opacity = 1
  index++

  setInterval(showNextQuote, 7000)
}

function addProjects(projects) {
  project_cards.innerHTML = ''

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
    project_cards.appendChild(a)
  })
}

function updateProjects(choice) {
  if (projectChoice != choice) {
    projectChoice = choice
    addProjects(projects_set[projectChoice])
  }
}

// initial calls
changingText()
addProjects(projects_set[projectChoice])
updateActiveButtons()
updateNavbar()

window.addEventListener('scroll', updateActiveButtons)
window.addEventListener('scroll', updateNavbar)
