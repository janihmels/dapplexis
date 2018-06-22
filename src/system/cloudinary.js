export default (pic) => {
  if(!pic) return null;

  const { version, id, format } = pic;
  let url='https://res.cloudinary.com/dnz18y6as/image/upload/g_face,c_thumb,w_150,h_150';
  url+='/v'+version;
  url+='/'+id;
  url+='.'+format;
  return url;
}
