import { fetchProductRequests } from "../../../../../api/product-reqs";
import { useFetchData } from "../../../../../hooks/useFetchData";
import { FaAngleUp } from "react-icons/fa";
export default function ProductsList() {
  const { data: reqs, isLoading } = useFetchData(fetchProductRequests);

  return (
    <ul className="flex flex-col list-none gap-5 mt-5">
      {reqs &&
        reqs.map((req) => {
          return (
            <li className="flex items-center gap-5">
              <div className="flex flex-col items-center">
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
            </li>
          );
        })}
    </ul>
  );
}
