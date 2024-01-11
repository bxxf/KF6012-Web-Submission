/**
 * This compoenent renders the footer of the application with student details.
 * @author Filip Brebera w21020340
 */

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-10 mt-10 md:my-10 mx-auto md:rounded-lg rounded-t-lg px-10 md:mx-10">
      <div>
        <p className="text-white text-xl md:text-2xl font-bold ">
          Coursework assignment for KF6012 Web Application Integration,
          Northumbria University
        </p>
      </div>
      <hr className="my-5"></hr>
      <div>
        <span className="text-gray-200 mb-2 block">Student Details:</span>
        <p className="text-white text-2xl font-bold">Filip Brebera</p>
        <p className="text-white">ID: w21020340</p>
      </div>
    </footer>
  );
}
