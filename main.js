$(document).ready(() => {
    $('#searchUser').on('keyup', (e) => {
        const username = e.target.value;

        if (username === '') {
            $('#profile').hide();
        } else {
            $('#profile').show();

            $.ajax({
                method: 'Get',
                dataType: 'Json',
                url: `https://api.github.com/users/${username}`,
                data: {
                    client_id: '2def1353be788d816ce2',
                    client_secret: '45f98d1f437a3b9339687bfaf63daf7c5258e1d2'
                }
            }).done(user => {
    
                $.ajax({
                    method: 'Get',
                    dataType: 'Json',
                    url: `https://api.github.com/users/${username}/repos`,
                    data: {
                        client_id: '2def1353be788d816ce2',
                        client_secret: '45f98d1f437a3b9339687bfaf63daf7c5258e1d2'
                    }
                }).done(repos => {

                    if (repos.length > 0) {
                        $('.page-header').show();

                        $.each(repos, (i, repo) => {
                            $('#repos').append(`
                                <div class="text-white bg-dark mb-3 p-4">
                                    <div class="row">
                                        <div class="col-md-7">
                                            <strong>${repo.name}</strong>: ${repo.description || '...'}
                                        </div>
                                        <div class="col-md-3">
                                            <span class="badge badge-success">Forks: ${repo.forks_count}</span>
                                            <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                                            <span class="badge badge-info">Stars: ${repo.stargazers_count}</span>
                                        </div>
                                        <div class="col-md-2">
                                            <a href="${repo.html_url}" target="_blank" class="btn btn-danger">Check Repo</a>
                                        </div>
                                    </div>
                                </div>
                            `);
                        })
                    }
                })

                $('#profile').html(`
                <div class="card border-danger mb-3">
                    <div class="card-header h4">${user.name || ''}</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                                <img class="thumbnail avatar" src="${user.avatar_url}">
                                <a class="btn btn-danger btn-block mt-3" target="_blank" href="${user.html_url}">Check Profile</a>
                            </div> 
                            <div class="col-md-9">
                                <span class="badge badge-danger">Public Repos: ${user.public_repos}</span>
                                <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                                <span class="badge badge-success">Followers: ${user.followers}</span>
                                <span class="badge badge-info">Following: ${user.following}</span>
    
                                <br><br>
    
                                <ul class="list-group">
                                    <li class="list-group-item">Company: ${user.company || '...'}</li>
                                    <li class="list-group-item">Blog: <a class="text-muted" href="${user.blog}">${user.blog}</a></li>
                                    <li class="list-group-item">Location: ${user.location}</li>
                                    <li class="list-group-item">Bio: ${user.bio || '...'}</li>
                                </ul>
                            </div> 
                        </div>
                    </div>
                </div>
    
                <h3 class="page-header mt-5 mb-2 reposTitle">Repos:</h3>
                <div id="repos"></div>
                `);
            })
        }
    })
})