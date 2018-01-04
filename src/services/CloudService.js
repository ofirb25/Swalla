import axios from 'axios';
import cloudinary from 'cloudinary-core';
const COLUD_URL = 'https://api.cloudinary.com/v1_1/${cloudName}/upload';
// const CLOUDINARY_URL=cloudinary://421965139317185:MmVvp847AMGwdcB1waEQCTaoKT0@havitush0
const CLOAD_NAME = 'havitush0';
const UPLOAD = 'upload'
var cl = new cloudinary.Cloudinary({cloud_name: CLOAD_NAME, secure: true});


