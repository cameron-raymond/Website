import React from 'react'
import agent_file from './CRaymondResume2018.pdf';

class Resume extends React.Component{
state = {}
render() {
return(
<div>
    <a href={agent_file} download="CameronRaymondResume.pdf" style={{ textDecoration: "none", color: "black" }}>Resume</a>        
</div>
);
}
}
export default Resume;