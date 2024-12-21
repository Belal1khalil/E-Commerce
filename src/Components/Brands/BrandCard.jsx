// eslint-disable-next-line no-unused-vars
export default function BrandCard({BrandInfo}) {
    const {image , name} = BrandInfo
    return <>
    <div className=" border-2 border-slate-200 rounded-lg hover:shadow-lg hover:shadow-primary-500 transition-all mx-3 my-2 ">
        <img 
        src={image}
        className="" 
         alt=""
         />
         <h4 className="text-center my-6">{name}</h4>
    </div>
    </>
}