
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      {
        path: 'products',
        name: 'products',
        component: () => import('pages/ProductsPage.vue')
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('pages/CategoriesPage.vue')
      },
      {
        path: 'add-product',
        name: 'Add Product',
        component: () => import('pages/AddProductPage.vue')
      },
      {
        path: 'edit-product/:id',
        name: 'Edit Product',
        component: () => import('pages/EditProductPage.vue')
      },
      {
        path: 'add-category',
        name: 'Add Category',
        component: () => import('pages/AddCategoryPage.vue')
      },
      {
        path: 'edit-category/:id',
        name: 'Edit Category',
        component: () => import('pages/EditCategoryPage.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: '/register',
    component: () => import('layouts/RegisterLayout.vue'),
    meta: {
      requiresVisitor: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
