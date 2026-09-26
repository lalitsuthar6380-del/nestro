
import TableHead from "@/components/admin/TableHead";
import StatusBadge from "@/components/admin/StatusBadge";
import ActionDropdown from "@/components/admin/ActionDropdown";
import PageHeader from "@/components/admin/PageHeader";
import DeleteButton from "@/components/admin/DeleteButton";
import EditButton from "@/components/admin/EditButton";
import {  fetchProducts } from "@/api/api";


export default async function Page() {
    const { success, data,message } = await fetchProducts();

    if (success == false) {
        throw new Error("Internal Server Error")
    }

    return (
        <div className="space-y-6">

            <PageHeader
                title="product Management"
                description="Manage Get, Create, Update, and Delete"
                buttonText="Add product"
                buttonLink="/admin/product/add"
            />

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <TableHead
                            columns={[
                                "Image",
                                "Name",
                                "Slug",
                                "Status",
                                "Edit",
                                "Delete",
                                "Action",

                            ]}
                        />

                        <tbody>

                            {data.map((item) => (

                                <tr
                                    key={item._id}
                                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                                >

                                    {/* Image */}
                                    <td className="px-6 py-4">

                                        {item.thumbnail ? (

                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />

                                        ) : (

                                            <div className="w-18 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                                                No Image
                                            </div>

                                        )}

                                    </td>

                                    {/* Name */}
                                    <td className="px-6 py-4 font-medium">
                                        {item.title}
                                    </td>

                                    {/* Slug */}
                                    <td className="px-6 py-4 text-gray-500">
                                        {item.slug}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <StatusBadge status={item.status} path={`product/status-update/${item._id}`} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <EditButton path={`/admin/product/edit/${item._id}`} />
                                    </td>
                                    <td className="px-6 py-4">
                                       <DeleteButton path={`product/delete/${item._id}`} />
                                    </td> 

                                     <td className="px-6 py-4">
                                       <ActionDropdown id={item._id} module="product" actions={["view", "images", "BestSeller", "stock"]}/>
                                    </td>


                                </tr>

                            ))}

                        </tbody>

                    </table>
                </div>


            </div>

        </div>
    );
}
