export default function News() {
  return (
    <section id="news" className="bg-black p-8 text-center">
      <div className="text-white text-3xl mb-8">
        <h2>
          <i>
            <b>In The News</b>
          </i>
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3 justify-between">
        {/* News Card 1 */}
        <div className=" bg-grey text-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="logo.jpg"
            alt="News 1"
            className="h-48 w-full object-cover lg:w-80 lg:mx-auto"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">
              RI5E: The new age startup
            </h3>
            <p className="text-white-700">
              RI5E is a leading venture studio that builds startups from
              scratch, providing comprehensive resources and hands-on support.{" "}
            </p>
          </div>
        </div>

        {/* News Card 2 */}
        <div className="bg-grey text-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="hiringCompany.png"
            alt="News 2"
            className="h-48 w-full object-cover lg:w-80 lg:mx-auto"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">Opportunities in Germany</h3>
            <p className="text-white-700">
              Germany's tech industry is booming with opportunities and is now
              providing professionals overseas to showcase their skillset and
              capabilities.{" "}
            </p>
          </div>
        </div>

        {/* News Card 3 */}
        <div className="bg-grey text-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="VSIdeas.png"
            alt="News 3"
            className="h-48 w-full object-cover lg:w-80 lg:mx-auto"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">VS Incubating Ideas</h3>
            <p className="text-white-700">
              Venture studios like RI5E don't just incubate ideas—they craft
              them from minus one to zero, forging new paths in
              entrepreneurship.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
