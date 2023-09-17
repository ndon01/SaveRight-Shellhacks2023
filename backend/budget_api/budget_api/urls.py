"""
URL configuration for budget_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from budget_api import views
from django.urls import path
from .views import RegisterView, LoginView



urlpatterns = [
    path('admin/', admin.site.urls),
    path('budgets/', views.budget_list, name='budget_list'),
    path('incomes/', views.income_list, name='income_list'),
    path('expenses/', views.expense_list, name='expense_list'),
    path('transactions/', views.get_expenses_and_budget, name='expenses_and_budgets'),
    path('budgets/<int:id>/', views.budget_by_id, name='budget_detail'),
    path('incomes/<int:id>/', views.income_by_id, name='income_detail'),
    path('expenses/<int:id>/', views.expense_by_id, name='expense_detail'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
