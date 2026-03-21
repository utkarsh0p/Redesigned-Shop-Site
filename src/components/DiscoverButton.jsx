import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Heart, ShoppingCart, X } from "lucide-react";

const ACTION_ICONS = [
  { id: "heart", icon: Heart, label: "Favourites" },
  { id: "cart", icon: ShoppingCart, label: "Cart" },
];

export function DiscoverButton({ onSearchToggle }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const expand = () => {
    setIsSearchExpanded(true);
    onSearchToggle?.(true);
  };

  const collapse = () => {
    setIsSearchExpanded(false);
    onSearchToggle?.(false);
  };

  return (
    <div className="flex items-center gap-2 p-1.5 h-full">
      {/* Search Pill */}
      <motion.div
        layout
        transition={{ type: "spring", damping: 20, stiffness: 230, mass: 1.2 }}
        onClick={() => !isSearchExpanded && expand()}
        className={`flex items-center bg-white rounded-full shadow-md cursor-pointer h-[40px] overflow-hidden relative px-3 transition-all duration-300 ${
          isSearchExpanded ? "w-[240px]" : "w-[40px]"
        }`}
      >
        <div className="shrink-0">
          <Search className="w-5 h-5 text-gray-700" />
        </div>

        <motion.div
          initial={false}
          animate={{
            width: isSearchExpanded ? "auto" : "0px",
            opacity: isSearchExpanded ? 1 : 0,
            filter: isSearchExpanded ? "blur(0px)" : "blur(4px)",
            marginLeft: isSearchExpanded ? "8px" : "0px",
          }}
          transition={{ type: "spring", damping: 20, stiffness: 230, mass: 1.2 }}
          className="overflow-hidden flex items-center flex-1"
        >
          <input
            type="text"
            placeholder="Search..."
            className="border-0 outline-none bg-transparent text-sm w-full font-primary"
            onClick={(e) => e.stopPropagation()}
            autoFocus={isSearchExpanded}
          />
        </motion.div>

        {/* X button inside search pill */}
        <AnimatePresence>
          {isSearchExpanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => { e.stopPropagation(); collapse(); }}
              className="shrink-0 ml-2 cursor-pointer"
            >
              <X className="w-4 h-4 text-gray-500" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Icons Pill — desktop only */}
      <motion.div
        layout
        transition={{ type: "spring", damping: 20, stiffness: 230, mass: 1.2 }}
        className="hidden md:flex items-center bg-white rounded-full shadow-md h-[40px] overflow-hidden relative px-2 gap-1"
      >
        {ACTION_ICONS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            aria-label={label}
            className="p-2 rounded-full hover:bg-offwhite transition-colors cursor-pointer flex items-center justify-center"
          >
            <Icon className="w-4 h-4 text-gray-700" />
          </button>
        ))}
      </motion.div>
    </div>
  );
}

export default DiscoverButton;
