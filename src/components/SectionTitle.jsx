

const SectionTitle = ({title,description}) => {
    return (
        <div className="text-center">
            <h2 className="text-4xl font-bold font-roboto text-center mb-8 uppercase">{title}</h2>
            <div className="flex flex-col justify-center items-center space-y-2">
                <img className="w-12" src="https://i.ibb.co/2sFHBqw/line-thin.png" alt="" />
                <img className="w-16" src="https://i.ibb.co/2sFHBqw/line-thin.png" alt="" />
            </div>
            <p>{description}</p>
        </div>
    );
};

export default SectionTitle;