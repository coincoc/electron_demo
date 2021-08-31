import path from 'path';

let basepath="";
if(process.env.NODE_ENV == 'development'){
    basepath = path.join(process.cwd(),'extraResources')
}else{
    basepath = path.join(process.cwd(),'/resources/extraResources')
}

export default {
    basepath
}