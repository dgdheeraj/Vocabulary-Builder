from django.urls import path,include
from . import views
from rest_framework import routers

# router=routers.DefaultRouter()
# router.register('details',views.details_view)

urlpatterns = [
    # path('',include(router.urls))
    # path('details/', views.get_object),
    path('details/', views.snippet_list),
    # path('details/<int:pk>', views.check),
    path('details/<pk>',views.check),
    # path(r'^details/(?P<pk>\d+)$',views.details_view.as_view()),
    # path('details/<int:pk>', views.details_view.as_view()),
]
