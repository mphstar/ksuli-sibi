const FooterPage = () => {
  return (
    <footer>
      <div className="flex flex-row justify-center py-2 bg-white">
        <p className="text-xs text-center">
          &copy; 2024 <span className="font-medium">Kedai Susu Tuli</span> &
          Developed by{" "}
          <a href="https://mphstar.me" target="_blank" rel="noopener noreferrer">
            <span className="underline font-semibold">Mphstar</span>
          </a>{" "}
          ❤️
        </p>
      </div>
    </footer>
  );
};

export default FooterPage;
