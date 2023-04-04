from django.db import models

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=254)
    friendly_name = models.CharField(max_length=254, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name

    def get_friendly_name(self):
        return self.friendly_name


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    sku = models.CharField(max_length=254, blank=True, null=True)
    name = models.CharField(max_length=254)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    rating = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    image_url = models.URLField(null=True,blank=True, max_length=1024)
    image = models.ImageField(null=True,blank=True)

    def __str__(self):
        return self.name
