import AdminLogina from "@/components/adminComponets/AdminLogin"

export default function page() {
  return (
    <>
      <div className="flex justify-center items-center h-[80vh]">
        <div className="p-8 bg-[#f0ecff] rounded-xl">
          <AdminLogina/>
        </div>
      </div>
    </>
  )
}
