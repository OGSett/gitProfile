import React, { useState, useEffect } from "react";
import { debounce, set } from "lodash";
import RepoToDisplay from './Test'

const Edit = () => {
    const defaultInfo = ({
        userName: 'GitHub',
        bio: 'How people build software.',
        followers: '300k',
        following: '150k',
        avatar: './images/gitIcon.png',
        location: 'USA, Los angelos'
    })
    const [userData, setUserData] = useState([])
    const [userRepos, setUserRepos] = useState([])
    const [userAllRepos, setUserAllRepos] = useState([])
    const [dataFetched, setDataFetched] = useState(false)
    const [reposFetched, setReposFetched] = useState(false)
    const [moreRepos, setMorerepos] = useState(false)
    const [loading, setLoading] = useState(true)
    const [idToSearch, setIdToSearch] = useState('')
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [debouncedId, setDebouncedId] = useState('')
    const [test, setTest] = useState("")
    const [wa3, setWa3] = useState("")
    const [searchMade, setSearchMade] = useState(false)
    const [tryy, setTryy] = useState(false)

    





    useEffect(() => {
    if (!test) return ( 
        setUserData([]),
        setReposFetched(false),
        setAvatarUrl(''),
        setTryy(false),
        setDataFetched(false)
    )
    const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
    if (!GITHUB_TOKEN) {
        console.error(process.env.REACT_APP_GITHUB_TOKEN);
        return;
    }
    fetch(`https://api.github.com/users/${test}`, {
        headers: {
             Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
    })
        .then(response => {
            if (!response.ok) throw new Error('Network response not ok');
            setDataFetched(true);
            
            return response.json();
        })
        .then(data => {
            setUserData(data);
            
            console.log('User data fetched successfully', data);    
        })
        .catch(error => {
            setDataFetched(false);
            console.error('Fetch error for user data:', error);
        });
    fetch(`https://api.github.com/users/${test}/repos`, {
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
    })
        .then(response => {
            if (!response.ok) throw new Error('Network response not ok for repos fetching');
            setReposFetched(true); 
            return response.json();
        })
        .then(reposData => {
            setUserAllRepos(reposData);
            setUserRepos(reposData.slice(0, 4));
            console.log('Repositories fetched successfully', reposData);
        })
        .catch(error => {
            setReposFetched(false);
            console.error('Fetch error for repos:', error);
        });
}, [ test]);



  useEffect(() => {
    if (dataFetched) {
        setAvatarUrl(`https://avatars.githubusercontent.com/${userData.login}`);
    }
    if (!test) {
        setAvatarUrl(defaultInfo.avatar);
    }
    console.log(wa3)
    
    }, [userData,dataFetched,test]);


    const handleChoosenProf = () => {
        setTryy(true)
        setDataFetched(false)
    }


   const handleMoreRepos = () => {
    setMorerepos(true)
   }

   const Defaultrepos = () => {
    return (
        <div className="rposWrapper">
                    <div className="repoHolder">
                        <span className="repoTitle">.github</span>
                        <span className="repoDesc">Community health files for the @GitHub organization </span>
                        <div className="repoInfoWrapper">
                            <div className="repoInfo">
                                <img src="./images/Nesting.svg" alt="" />
                                <span>2,369</span>
                            </div>
                            <div className="repoInfo">
                                <img src="./images/Star.svg" alt="" />
                                <span>2,000</span>
                            </div>
                            <div className="repoInfo">
                                <span>updated 4 days ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="repoHolder">
                        <span className="repoTitle">accessibility-alt-text-bot</span>
                        <span className="repoDesc">An action to remind users to add alt text on Issues, Pull Requests, and Descussions </span>
                        <div className="repoInfoWrapper">
                            <div className="repoInfo">
                                <img src="./images/Nesting.svg" alt="" />
                                <span>7</span>
                            </div>
                            <div className="repoInfo">
                                <img src="./images/Chield_alt.svg" alt="" />
                                <span>MIT</span>
                            </div>
                            <div className="repoInfo">
                                <img src="./images/Star.svg" alt="" />
                                <span>5</span>
                            </div>
                            <div className="repoInfo">
                                <span>updated 3 days ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="repoHolder">
                        <span className="repoTitle">accessibilityjs</span>
                        <span className="repoDesc">Client side accessibility error scanner. </span>
                        <div className="repoInfoWrapper">
                            <div className="repoInfo">
                                <img src="./images/Nesting.svg" alt="" />
                                <span>72</span>
                            </div>
                            <div className="repoInfo">
                                <img src="./images/Star.svg" alt="" />
                                <span>2181</span>
                            </div>
                            <div className="repoInfo">
                                <img src="./images/Chield_alt.svg" alt="" />
                                <span>MIT</span>
                            </div>
                            <div className="repoInfo">
                                <span>updated 4 days ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="repoHolder">
                        <span className="repoTitle">action-cheat-sheet</span>
                        <span className="repoDesc">A cheat sheet for GitHub Actions </span>
                        <div className="repoInfoWrapper">
                            <div className="repoInfo">
                                <img src="./images/Nesting.svg" alt="" />
                                <span>26</span>
                            </div>
                            <div className="repoInfo">
                                <img src="./images/Star.svg" alt="" />
                                <span>94</span>
                            </div>
                            <div className="repoInfo">
                                <img src="./images/Chield_alt.svg" alt="" />
                                <span>MIT</span>
                            </div>
                            <div className="repoInfo">
                                <span>updated 4 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>
    )
   }

   const AllReposDisplayed = ({ userAllRepos = [] }) => {
        return (
            <div className="rposWrapper">
            {
                userAllRepos.map((repo) => (
                    <div className="repoHolder" key={repo.id}>
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
        )
   }
   console.log(userRepos)
    const ProfileRender = () => {
        return (
            <div className="searchHolderq">
                <div className="partOne">
                    <div className="imgProfileHolder">
                        {/* {userData ? <img src="./images/gitIcon.png" alt="" /> : <img src={avatarUrl} alt="" />} */}
                        <img src={tryy ? avatarUrl : defaultInfo.avatar} alt="avatar" />
                    </div>
                    <div className="test2">
                        <div className="basicInfo">
                            <span className="BIspan">Followers</span>
                            <span className="line"></span>
                            <span className="BIspanValue">{tryy ?  userData.followers : defaultInfo.followers }</span>
                        </div>
                        <div className="basicInfo">
                            <span className="BIspan">Following</span>
                            <span className="line"></span>
                            <span className="BIspanValue">{tryy ?  userData.following : defaultInfo.following }</span>
                        </div>
                        <div className="basicInfo">
                            <span className="BIspan">Location</span>
                            <span className="line"></span>
                            <span className="BIspanValue">{tryy ?  (userData.location || 'n/a') : defaultInfo.location }</span>
                        </div>
                    </div>
                </div>
                <div className="gitWelcome">
                    <h1>{tryy ?  userData.login : 'GitHub' }</h1>
                    <p>{tryy ?  userData.bio : defaultInfo.bio }</p>
                </div>
                <div className="tester1">
                <div className="allrepos">
                    <span onClick={handleMoreRepos} className={moreRepos ? 'hide' : 'ss'}>View all repositories</span>
                </div>
                {reposFetched && tryy ? (!moreRepos ? (<RepoToDisplay  userRepos={userRepos} />) : (<AllReposDisplayed userAllRepos={userAllRepos}/>)) : (<Defaultrepos/>)}
                
                
                </div>
            </div>
        );
    }
    return ( 
        <div className="compWrapper">
            <div className="searchHolder">
                <div className="inputHolder">
                    <img className="check" src="./images/Search.svg" alt="/" />
                    <input type="text" value={test} onChange={(e) => {setTest(e.target.value)}}/>
                </div>
                    {dataFetched ? (<div className="wa3" onClick={handleChoosenProf}>
                        <img className="imageCheck" src={avatarUrl || defaultInfo.avatar} alt="" />
                        <div className="foundedProf">
                            <span>{ userData.login || 'GitHub'}</span>
                            <span>{userData.bio || defaultInfo.bio}</span>
                        </div>
                    </div>) : null}
            </div>
            <ProfileRender/>
        </div>
     );
}
 
export default Edit;