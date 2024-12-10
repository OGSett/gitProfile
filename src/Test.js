const RepoToDisplay = ({ userRepos = [], setTest }) => {
    console.log('l3bar is ', userRepos)
    const handleRepoClick = (repoUrl) => {
        window.open(repoUrl, "_blank")
        console.log("wiaaa3", repoUrl)
    }
    return (
        <div className="rposWrapper" >
            {
                userRepos.map((repo) => (
                    <div className="repoHolder" key={repo.id} onClick={() => handleRepoClick(repo.html_url)}>
                        

                        <span className="repoTitle">{repo.name}</span>
                        <span className="repoDesc">
                            {repo.description || "No description provided"}
                        </span>
                        <div className="repoInfoWrapper">
                            <div className="repoInfo">
                                <img src="./images/Nesting.svg" alt="Forks Icon" />
                                <span>{repo.forks_count}</span>
                            </div>
                            <div className="repoInfo">
                                <img src="./images/Star.svg" alt="Stars Icon" />
                                <span>{repo.stargazers_count}</span>
                            </div>
                            <div className="repoInfo">
                                <span>
                                    updated{" "}
                                    {new Date(repo.updated_at).toLocaleDateString()}
                                </span>
                            </div>
                        
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default RepoToDisplay;
