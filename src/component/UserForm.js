import React, { useState } from "react";
import "./userForm.css";

const UserForm = () => {
    const [userName, setUserName] = useState("");
    const [userWithFork, setUserWithFork] = useState([]);
    const [userWithoutFork, setUserWithoutFork] = useState([]);
    const [isFork, setIsfork] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getUserList = (e) => {
        setIsLoading(true)
        let url = `https://api.github.com/users/${userName}/repos`;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setIsLoading(false)
                setUserWithFork(res)
                let arr = []
                arr = res.filter(item => !item.fork)
                setUserWithoutFork(arr)
            })
            .catch((error) => {
                setIsLoading(false)
                console.log('Request failed', error);
                alert("Something went wrong...!")
            });

    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="">
                        <label htmlFor="fname">GitHub UserName:</label>
                        <input
                            type="text"
                            id="fname"
                            name="userName"
                            value={userName}
                            placeholder="Enter user name..."
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <label htmlFor="forks"> Include Forks:</label>
                        <input
                            type="checkbox"
                            id="forks"
                            name="forks"
                            value={isFork}
                            onChange={(e) => setIsfork(e.target.checked)}
                        />
                    </div>
                    <div className="btn">
                        <input
                            disabled={ userName ? false : true }
                            type="submit"
                            value="Submit"
                            onClick={getUserList}
                            className={userName ? "active" : "inActive"}
                        />
                    </div>
                </div>
            </div>
            <div className="container-table">
                <h3 style={{ marginTop: "0" }}>List of GitHub Users</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Language</th>
                            <th>Description</th>
                            <th>Size</th>
                            <th>Fork</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading
                                ?
                                <tr>
                                    <td className="no-record" colSpan="12">
                                        <div className="loader"></div>
                                    </td>
                                </tr>
                                :
                                (
                                    userWithFork.length > 0
                                        ?
                                        (
                                            isFork ?
                                                userWithFork.map((item, index) => {
                                                    return <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td>{item.language}</td>
                                                        <td>{item.description ? item.description : "-"}</td>
                                                        <td>{item.size}</td>
                                                        <td>{item.fork ? "True" : "False"}</td>
                                                    </tr>
                                                })
                                                :
                                                userWithoutFork.map((item, index) => {
                                                    return <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td>{item.language}</td>
                                                        <td>{item.description ? item.description : "-"}</td>
                                                        <td>{item.size}</td>
                                                        <td>{item.fork ? "True" : "False"}</td>
                                                    </tr>

                                                })
                                        )

                                        :
                                        <tr>
                                            <td className="no-record" colSpan="6">No record available</td>
                                        </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default UserForm;
