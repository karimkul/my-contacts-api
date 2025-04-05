// import { defineConfig } from "eslint/config";
// import globals from "globals";
// import js from "@eslint/js";

// export default defineConfig([
//     { files: ["**/*.{js,mjs,cjs}"] },
//     { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
//     {
//         files: ["**/*.{js,mjs,cjs}"],
//         languageOptions: { globals: globals.browser }
//     },
//     {
//         files: ["**/*.{js,mjs,cjs}"],
//         plugins: { js },
//         extends: ["js/recommended"]
//     }
// ]);
import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
    { files: ["**/*.{js,mjs,cjs}"] },
    { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node // ✅ Add this line
            }
        }
    },
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended"]
    }
]);
