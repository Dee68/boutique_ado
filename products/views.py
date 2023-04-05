from django.shortcuts import (
                                render,
                                get_object_or_404,
                                redirect,
                                reverse
                            )
from django.db.models import Q
from .models import Product, Category

# Create your views here.


def all_products(request):
    products = Product.objects.all()
    query = None
    category = None
    categories = None
    if request.GET:
        if 'category' in request.GET:
            categories = request.GET['category'].split(',')
            products = products.filter(category__name__in=categories)
            categories = Category.objects.filter(name__in=categories)

        if 'q' in request.GET:
            query = request.GET['q']
            if not query:
                messages.error(request, 'You did not enter a search query criteria')
                return redirect(reverse('products:products'))
            queries = Q(name__icontains=query) | Q(description__icontains=query)
            products = products.filter(queries)
    context = {
                'products': products,
                'search_term': query,
                'current_categories': categories
              }
    return render(request, 'products/products.html', context)


def product_detail(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    context = {'product': product}
    return render(request, 'products/product_detail.html', context)
