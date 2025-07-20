const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations", "Design", "Product"]

const projects = [
  { id: 1, name: "Website Redesign", status: "completed", completion: 100 },
  { id: 2, name: "Mobile App", status: "in-progress", completion: 75 },
  { id: 3, name: "Data Migration", status: "pending", completion: 0 },
  { id: 4, name: "API Integration", status: "in-progress", completion: 60 },
  { id: 5, name: "Security Audit", status: "completed", completion: 100 },
]

const feedbackTemplates = [
  "Excellent work on the recent project. Shows great leadership skills.",
  "Consistently delivers high-quality work on time.",
  "Great team player and communicates effectively.",
  "Shows initiative and takes ownership of tasks.",
  "Could improve on time management but overall good performance.",
  "Demonstrates strong technical skills and problem-solving abilities.",
]

function generateMockData(user) {
  const department = departments[Math.floor(Math.random() * departments.length)]
  const performance = Math.round((Math.random() * 4 + 1) * 10) / 10 // 1.0 to 5.0

  const userProjects = projects.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1)

  const userFeedback = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
    id: i + 1,
    from: `Manager ${i + 1}`,
    message: feedbackTemplates[Math.floor(Math.random() * feedbackTemplates.length)],
    rating: Math.floor(Math.random() * 5) + 1,
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  }))

  return {
    ...user,
    company: {
      ...user.company,
      department,
    },
    performance,
    bio: `Experienced professional in ${department} with ${Math.floor(Math.random() * 10) + 1} years of experience. Passionate about delivering excellent results and collaborating with team members.`,
    projects: userProjects,
    feedback: userFeedback,
  }
}

export async function fetchUsers() {
  try {
    const response = await fetch("https://dummyjson.com/users?limit=20")
    const data = await response.json()
    return data.users.map(generateMockData)
  } catch (error) {
    console.error("Failed to fetch users:", error)
    throw new Error("Failed to fetch users")
  }
}

export async function fetchUserById(id) {
  try {
    const response = await fetch(`https://dummyjson.com/users/${id}`)
    const user = await response.json()
    return generateMockData(user)
  } catch (error) {
    console.error("Failed to fetch user:", error)
    return null
  }
}

export function generateAnalyticsData(users) {
  const departmentMap = new Map()

  users.forEach((user) => {
    const dept = user.company.department
    const current = departmentMap.get(dept) || { total: 0, count: 0 }
    departmentMap.set(dept, {
      total: current.total + user.performance,
      count: current.count + 1,
    })
  })

  const departmentRatings = Array.from(departmentMap.entries()).map(([department, data]) => ({
    department,
    rating: Math.round((data.total / data.count) * 10) / 10,
    count: data.count,
  }))

  const bookmarkTrends = [
    { month: "Jan", bookmarks: Math.floor(Math.random() * 20) + 5 },
    { month: "Feb", bookmarks: Math.floor(Math.random() * 20) + 5 },
    { month: "Mar", bookmarks: Math.floor(Math.random() * 20) + 5 },
    { month: "Apr", bookmarks: Math.floor(Math.random() * 20) + 5 },
    { month: "May", bookmarks: Math.floor(Math.random() * 20) + 5 },
    { month: "Jun", bookmarks: Math.floor(Math.random() * 20) + 5 },
  ]

  return { departmentRatings, bookmarkTrends }
}
