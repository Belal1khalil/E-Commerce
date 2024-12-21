
// eslint-disable-next-line react/prop-types
export default function CardCat({categoryInfo}) {
     // eslint-disable-next-line react/prop-types
     const {image , name}   =  categoryInfo
    return <>
    <div className="CardCategory border-2 border-slate-300 rounded-md  mx-3 my-5 hover:shadow-lg hover:shadow-primary-500 transition-all   ">
        <img src={image}
        className="w-full h-72 object-cover"
        alt="" />
       <h2 className="my-4 font-semibold text-3xl text-primary-500 text-center">{name}</h2>
    </div>
    </>
 }