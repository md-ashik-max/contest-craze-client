import { FaSearch } from "react-icons/fa";
import useAllContest from "../../../../hooks/useAllContest";
import { useState } from "react";
import { Link } from "react-router-dom";


const SearchBox = () => {
    const [search, setSearch] = useState("");
    const[filteredContest,setFilteredContest]=useState([])
    const [hidden,setHidden]= useState('hidden')
    const [allContest] = useAllContest()
    const handleChange = (event) => {
        setSearch(event.target.value.toLowerCase()); 
        const filteredData = allContest.filter((contest) => {
            
            const searchFields = ['category','name']; 
            return searchFields.some((field) =>
                contest[field].toLowerCase().includes(search)
            );
        });
        if(filteredData){
            setHidden('mt-4 absolute z-10 bg-base-100 px-12 pb-12 rounded-xl')
        }else{
            setHidden('hidden')
        }
        setFilteredContest(filteredData);
        
    };
    return (
        <section className="max-w-7xl mx-6 my-6 lg:mx-auto bg-[#0677A1] px-12 py-4 rounded-xl">
            <div className="grid grid-cols-5 md:grid-cols-10 items-center gap-2">
                <input
                    type="text"
                    placeholder="Search your category or contest name"
                    onChange={handleChange}
                    value={search}
                    autoComplete="off"
                    className="w-full px-4 py-2 rounded-md col-span-2 md:col-span-7"
                />

               


                <div className="col-span-1 text-xl">
                    <FaSearch />
                </div>
            </div>
            <div className={hidden}>
                {filteredContest.length > 0 ? (
                    <ul>
                        {filteredContest.map((contest) => (
                            <Link key={contest._id} to={`/contestDetails/${contest._id}`}>
                                <li className="hover:text-white hover:p-2 rounded-xl hover:bg-slate-500">
                                    {contest.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <p>No contests found matching your search.</p>
                )}
            </div>
        </section>
    );
};

export default SearchBox;