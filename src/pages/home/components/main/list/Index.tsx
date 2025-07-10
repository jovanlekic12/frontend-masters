import { fetchProductRequests } from "../../../../../api/product-reqs";
import Loader from "../../../../../components/Loader";
import { useFetchData } from "../../../../../hooks/useFetchData";
import { FaAngleUp } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
export default function ProductsList() {
  const { data: reqs, isLoading } = useFetchData(fetchProductRequests);
  console.log(reqs);
  return (
    <ul className="flex flex-col list-none gap-7 mt-5">
      {isLoading && <Loader />}
      {reqs &&
        reqs.map((req) => {
          return (
            <li className="flex items-center w-full justify-between px-5 py-2">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center px-2 py-2">
                  <FaAngleUp className="text-blue-600" />
                  <h5 className="text-black font-bold text-base">
                    {req.upvotes}
                  </h5>
                </div>
                <div className="flex flex-col items-start">
                  <h5 className="text-black font-bold text-lg">{req.title}</h5>
                  <p>{req.description}</p>
                  <span className="capitalize text-blue-600 font-semibold">
                    {req.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 justify-self-end">
                <FaRegCommentDots />
                <span>{req.comments?.length}</span>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
