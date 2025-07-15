import { useRef, useEffect } from 'react';

const githubAPI = (OWNER, GITNAME) =>
    `https://api.github.com/repos/${OWNER}/${GITNAME}/trees/main`;

const temp = "https://github.com/uwungu01-rep/example_git";

