export default function Footer() {
  return (
    <footer className="bg-white border-t py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-500 mb-4">
          © {new Date().getFullYear()} FileConv. Built for speed and privacy.
        </p>
        <div className="flex justify-center space-x-6 text-sm text-gray-400">
          <a href="#" className="hover:text-gray-600">Privacy Policy</a>
          <a href="#" className="hover:text-gray-600">Terms of Service</a>
          <a href="#" className="hover:text-gray-600">Contact</a>
        </div>
      </div>
    </footer>
  );
}
