

const gitHubForm = document.getElementById('github-form')
const userList = document.getElementById('user-list')
const repoList = document.getElementById('repos-list')


gitHubForm.addEventListener('submit', (e) => {
    e.preventDefault()
    userList.innerHTML = ""
    repoList.innerHTML = ""
    const userName = document.getElementById('search').value

    fetch(`https://api.github.com/search/users?q=${userName}`)
        .then(response => {
            if (!response.ok) {
                console.log(response.status)
            }
            return response.json()
        })
        .then(results => {
            userList.innerHTML = ""
            results.items.forEach(user => {
                console.log(user.login)
                console.log(user.avatar_url)
                console.log(user.html_url)

                const userLi = document.createElement('li')
                // userLi.textContent = user.login
                userList.append(userLi)
                const userLink = document.createElement('a')
                userLink.href = user.html_url
                userLink.textContent = user.login
                userLi.append(userLink)
                const avatarImg = document.createElement('img')
                avatarImg.src = user.avatar_url
                userLi.append(avatarImg)

                userLi.addEventListener('click', function (clickEvent) {
                    // console.log(clickEvent)

                    console.log(user.login)

                    fetch(`https://api.github.com/users/${user.login}/repos`)
                        .then(response => {
                            if (!response.ok) {
                                console.log(response.status)
                            }
                            return response.json()
                        })
                        .then(results => {
                            repoList.innerHTML = ""
                            results.forEach(repo => {
                                const userLi = document.createElement('li')
                                // userLi.textContent = user.login
                                repoList.append(userLi)
                                const userLink = document.createElement('p')

                                userLink.textContent = repo.name
                                userLi.append(userLink)
                            })


                        })
                })

            })
        })
    })
