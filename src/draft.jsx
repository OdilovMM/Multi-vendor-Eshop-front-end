<div
                className={`${
                  showCategory ? "h-0" : "h-[500px]"
                } overflow-hidden transition-all md-lg:relative duration-100 absolute z-[99999] bg-[#c4d3d5fe] w-full border-x`}
              >
                <ul className="py-2 text-slate-600 overflow-y-scroll h-full font-semibold uppercase">
                  {categories?.map((cat, index) => {
                    return (
                      <li
                        key={index}
                        className="flex items-center hover:bg-slate-500 transition-all duration-300 hover:text-white  gap-2 justify-start px-2 py-[3px]"
                      >
                        <Link
                          onClick={() => setShowCategory(!showCategory)}
                          to={`/products?category=${cat.name}`}
                          className="text-sm flex items-center justify-between capitalize w-full h-full"
                        >
                          <img
                            src={cat.image}
                            alt=""
                            className="h-[33px] w-[33px] rounded-full object-fit"
                          />
                          {cat.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>