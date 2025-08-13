import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import type { RootState } from '../../../store';
import { 
  fetchMenus,
  fetchMenuItems,
  createMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../../../store/restaurantProfileSlice';
import restaurantProfileService from '../../../services/restaurantProfileService';
import './restaurantprofile.css';

const MenuManagement: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { menus, menusLoading, menuItemsByMenuId, menuItemsLoadingByMenuId, error } = useSelector((s: RootState) => s.restaurantProfile);

  const [selectedMenuId, setSelectedMenuId] = useState<string | ''>('');
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', available: true });
  const [editing, setEditing] = useState<{ menuId: string; itemId: string } | null>(null);
  const [editValues, setEditValues] = useState({ name: '', description: '', price: '', available: true });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemImages, setItemImages] = useState<Record<string, string>>({});
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [newMenu, setNewMenu] = useState({ name: '', description: '', available: true });
  const [newItemImage, setNewItemImage] = useState<File | null>(null);

  // Derive local aliases to match previous usage
  const menuItems = menuItemsByMenuId;
  const loading = {
    menus: menusLoading,
    menuItems: selectedMenuId ? Boolean(menuItemsLoadingByMenuId[selectedMenuId]) : false,
  };

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  useEffect(() => {
    if (menus.length && !selectedMenuId) {
      setSelectedMenuId(menus[0].id);
    }
  }, [menus, selectedMenuId]);

  // Ensure the selected menu always belongs to the current restaurant's menus
  useEffect(() => {
    if (selectedMenuId && !menus.some(m => m.id === selectedMenuId)) {
      setSelectedMenuId(menus[0]?.id || '');
    }
  }, [selectedMenuId, menus]);

  // Fetch items for the selected (owned) menu; gracefully fallback on 403 or stale selection
  useEffect(() => {
    const run = async () => {
      if (!selectedMenuId) return;
      try {
        await dispatch(fetchMenuItems(selectedMenuId)).unwrap();
      } catch (e: any) {
        const msg = String(e?.message || '').toLowerCase();
        if (!menus.some(m => m.id === selectedMenuId) || msg.includes('forbidden') || msg.includes('403')) {
          setSelectedMenuId(menus[0]?.id || '');
        }
      }
    };
    run();
  }, [dispatch, selectedMenuId, menus]);

  // Load images for items of the selected menu
  useEffect(() => {
    const loadImages = async () => {
      if (!selectedMenuId) return;
      const items = menuItems[selectedMenuId] || [];
      for (const it of items) {
        if (!itemImages[it.id]) {
          try {
            const media = await restaurantProfileService.getMedia('menuItem', it.id);
            if (media && media.length > 0) {
              setItemImages(prev => ({ ...prev, [it.id]: media[0].url }));
            }
          } catch (e) {
            // ignore per-item media fetch errors
          }
        }
      }
    };
    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMenuId, menuItems[selectedMenuId]]);

  const handleCreateMenu = async () => {
    if (!newMenu.name.trim()) return;
    try {
      const res = await dispatch(createMenu({
        name: newMenu.name.trim(),
        description: newMenu.description || undefined,
      })).unwrap();
      setShowAddMenuModal(false);
      setNewMenu({ name: '', description: '', available: true });
      // Select the newly created menu
      if (res?.id) setSelectedMenuId(res.id);
    } catch (e) {
      // could show toast
    }
  };

  const handleAdd = async () => {
    if (!selectedMenuId || !newItem.name || !newItem.price) return;
    try {
      const created = await dispatch(createMenuItem({
        menuId: selectedMenuId,
        payload: {
          name: newItem.name,
          description: newItem.description || undefined,
          price: parseFloat(newItem.price),
          available: newItem.available,
        }
      })).unwrap();

      // If an image was selected, upload it and attach to the created menu item
      if (created?.item?.id && newItemImage) {
        try {
          const media = await restaurantProfileService.uploadMenuItemImage(selectedMenuId, created.item.id, newItemImage);
          const uploadedUrl = (media as any)?.url ?? (media as any)?.media?.url;
          if (uploadedUrl) {
            setItemImages(prev => ({ ...prev, [created.item.id]: uploadedUrl }));
          }
        } catch (err) {
          // optional: show toast error for image upload
        }
      }

      setNewItem({ name: '', description: '', price: '', available: true });
      setNewItemImage(null);
      dispatch(fetchMenuItems(selectedMenuId));
      setShowAddModal(false);
    } catch (e) {
      // optional: show toast error for create item
    }
  };

  const startEdit = (menuId: string, item: { id: string; name: string; description?: string; price: number; available: boolean; }) => {
    setEditing({ menuId, itemId: item.id });
    setEditValues({
      name: item.name,
      description: item.description || '',
      price: String(item.price ?? ''),
      available: item.available,
    });
    setShowEditModal(true);
  };

  const saveEdit = async () => {
    if (!editing) return;
    await dispatch(updateMenuItem({
      menuId: editing.menuId,
      itemId: editing.itemId,
      payload: {
        name: editValues.name,
        description: editValues.description || undefined,
        price: parseFloat(editValues.price),
        available: editValues.available,
      }
    }));
    setEditing(null);
    setShowEditModal(false);
    dispatch(fetchMenuItems(editing.menuId));
  };

  const removeItem = async (menuId: string, itemId: string) => {
    await dispatch(deleteMenuItem({ menuId, itemId }));
    dispatch(fetchMenuItems(menuId));
  };

  return (
    <div className="machraoui-menu-management-container">
      {/* Top Navigation Bar */}
      <div className="machraoui-top-bar">
        <div className="machraoui-logo-container">
          <div className="machraoui-logo-icon"></div>
          <div className="machraoui-logo-text">
            FoodieExpress
            <span className="machraoui-help-text">help</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="machraoui-view-earnings-btn"
            onClick={() => navigate('/restaurant-profile')}
          >
            Back to Profile
          </button>
          <button className="machraoui-settings-btn">Settings</button>
        </div>
      </div>

      {/* Menu Management Section */}
      <div className="machraoui-menu-management-card">
        <div className="machraoui-menu-header">
          <div>
            <h1 className="machraoui-menu-title">Menu Management</h1>
            <div className="machraoui-menu-subtitle">
              Manage your restaurant menu items, prices, and availability
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <select
              value={selectedMenuId}
              onChange={(e) => setSelectedMenuId(e.target.value)}
              className="machraoui-category-tab"
            >
              {menus.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <button className="machraoui-add-item-btn" onClick={() => setShowAddMenuModal(true)}>+ Add Menu</button>
          </div>
        </div>

        {/* Add New Item */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className="machraoui-add-item-btn"
              onClick={() => setShowAddModal(true)}
              disabled={!selectedMenuId || loading.menuItems}
            >
              <span className="plus">+</span> Add New Item
            </button>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="machraoui-menu-grid">
          {selectedMenuId && (menuItems[selectedMenuId] ?? []).map((item) => (
            <div key={item.id} className="machraoui-menu-item-card">
              {/* Status Badge - Top Right */}
              <span className={`machraoui-status-badge-menu ${item.available ? 'available' : 'out-of-stock'}`}>
                {item.available ? 'Available' : 'Out of Stock'}
              </span>

              {/* Item Content */}
              <div className="machraoui-menu-item-content">
                {/* Icon */}
                <div 
                  className="machraoui-menu-item-icon"
                  style={{ background: item.available ? '#34d399' : '#f87171', overflow: 'hidden' }}
                >
                  {itemImages[item.id] ? (
                    <img src={itemImages[item.id]} alt={item.name} className="machraoui-menu-item-thumb" />
                  ) : (
                    '?'
                  )}
                </div>

                {/* Item Details */}
                <div className="machraoui-menu-item-details">
                  <div className="machraoui-menu-item-name">{item.name}</div>
                  <div className="machraoui-menu-item-category">{selectedMenuId && menus.find(m => m.id === selectedMenuId)?.name}</div>
                  <div className="machraoui-menu-item-description">{item.description || '—'}</div>
                </div>
              </div>

              {/* Price and Time */}
              <div className="machraoui-menu-item-price-time">
                <span className="machraoui-menu-item-price">${(item.price ?? 0).toFixed(2)}</span>
                <span className="machraoui-menu-item-time">ID: {item.id.slice(0,6)}</span>
              </div>

              {/* Action Buttons */}
              <div className="machraoui-menu-item-actions">
                <button className="machraoui-edit-btn" onClick={() => startEdit(selectedMenuId, item)}>Edit</button>
                <button className="machraoui-delete-btn" onClick={() => removeItem(selectedMenuId, item.id)}>Delete</button>
              </div>
            </div>
          ))}
          {selectedMenuId && !loading.menuItems && (menuItems[selectedMenuId] ?? []).length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 16 }}>No items yet.</div>
          )}
          {loading.menuItems && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 16 }}>Loading items...</div>
          )}
          {error && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 16, color: 'red' }}>{error}</div>
          )}
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="machraoui-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="machraoui-modal" onClick={(e) => e.stopPropagation()}>
            <div className="machraoui-modal-header">
              <h3 className="machraoui-modal-title">Add New Item</h3>
              <button className="machraoui-modal-close-btn" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="machraoui-modal-body">
              <div className="machraoui-form-group">
                <label className="machraoui-inline-label">Name</label>
                <input
                  placeholder="Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem(v => ({ ...v, name: e.target.value }))}
                  className="machraoui-input"
                />
              </div>
              <div className="machraoui-form-group">
                <label className="machraoui-inline-label">Description</label>
                <input
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) => setNewItem(v => ({ ...v, description: e.target.value }))}
                  className="machraoui-input"
                />
              </div>
              <div className="machraoui-form-group">
                <label className="machraoui-inline-label">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewItemImage(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                  className="machraoui-input"
                />
              </div>
              <div className="machraoui-form-grid">
                <div className="machraoui-form-group">
                  <label className="machraoui-inline-label">Price</label>
                  <input
                    placeholder="Price"
                    type="number"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem(v => ({ ...v, price: e.target.value }))}
                    className="machraoui-input"
                  />
                </div>
                <label className="machraoui-inline-availability" style={{ alignSelf: 'flex-end' }}>
                  <input
                    type="checkbox"
                    className="machraoui-checkbox"
                    checked={newItem.available}
                    onChange={(e) => setNewItem(v => ({ ...v, available: e.target.checked }))}
                  />
                  Available
                </label>
              </div>
            </div>
            <div className="machraoui-form-actions">
              <button className="machraoui-btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="machraoui-btn-primary" onClick={handleAdd} disabled={!selectedMenuId || loading.menuItems}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditModal && (
        <div
          className="machraoui-modal-overlay"
          onClick={() => {
            setShowEditModal(false);
            setEditing(null);
          }}
        >
          <div className="machraoui-modal" onClick={(e) => e.stopPropagation()}>
            <div className="machraoui-modal-header">
              <h3 className="machraoui-modal-title">Edit Item</h3>
              <button
                className="machraoui-modal-close-btn"
                onClick={() => {
                  setShowEditModal(false);
                  setEditing(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="machraoui-modal-body">
              <div className="machraoui-form-group">
                <label className="machraoui-inline-label">Name</label>
                <input
                  placeholder="Name"
                  value={editValues.name}
                  onChange={(e) => setEditValues(v => ({ ...v, name: e.target.value }))}
                  className="machraoui-input"
                />
              </div>
              <div className="machraoui-form-group">
                <label className="machraoui-inline-label">Description</label>
                <input
                  placeholder="Description"
                  value={editValues.description}
                  onChange={(e) => setEditValues(v => ({ ...v, description: e.target.value }))}
                  className="machraoui-input"
                />
              </div>
              <div className="machraoui-form-grid">
                <div className="machraoui-form-group">
                  <label className="machraoui-inline-label">Price</label>
                  <input
                    placeholder="Price"
                    type="number"
                    step="0.01"
                    value={editValues.price}
                    onChange={(e) => setEditValues(v => ({ ...v, price: e.target.value }))}
                    className="machraoui-input"
                  />
                </div>
                <label className="machraoui-inline-availability" style={{ alignSelf: 'flex-end' }}>
                  <input
                    type="checkbox"
                    className="machraoui-checkbox"
                    checked={editValues.available}
                    onChange={(e) => setEditValues(v => ({ ...v, available: e.target.checked }))}
                  />
                  Available
                </label>
              </div>
            </div>
            <div className="machraoui-form-actions">
              <button
                className="machraoui-btn-secondary"
                onClick={() => {
                  setShowEditModal(false);
                  setEditing(null);
                }}
              >
                Cancel
              </button>
              <button
                className="machraoui-btn-primary"
                onClick={saveEdit}
                disabled={loading.menuItems || !editing}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Menu Modal */}
      {showAddMenuModal && (
        <div className="machraoui-modal-overlay" onClick={() => setShowAddMenuModal(false)}>
          <div className="machraoui-modal" onClick={(e) => e.stopPropagation()}>
            <div className="machraoui-modal-header">
              <h3 className="machraoui-modal-title">Add New Menu</h3>
              <button className="machraoui-modal-close-btn" onClick={() => setShowAddMenuModal(false)}>×</button>
            </div>
            <div className="machraoui-modal-body">
              <div className="machraoui-form-group">
                <label className="machraoui-inline-label">Name</label>
                <input
                  placeholder="Menu name"
                  value={newMenu.name}
                  onChange={(e) => setNewMenu(v => ({ ...v, name: e.target.value }))}
                  className="machraoui-input"
                />
              </div>
              <div className="machraoui-form-group">
                <label className="machraoui-inline-label">Description</label>
                <input
                  placeholder="Description (optional)"
                  value={newMenu.description}
                  onChange={(e) => setNewMenu(v => ({ ...v, description: e.target.value }))}
                  className="machraoui-input"
                />
              </div>
              <label className="machraoui-inline-availability" style={{ alignSelf: 'flex-end' }}>
                <input
                  type="checkbox"
                  className="machraoui-checkbox"
                  checked={newMenu.available}
                  onChange={(e) => setNewMenu(v => ({ ...v, available: e.target.checked }))}
                />
                Available
              </label>
            </div>
            <div className="machraoui-form-actions">
              <button className="machraoui-btn-secondary" onClick={() => setShowAddMenuModal(false)}>Cancel</button>
              <button className="machraoui-btn-primary" onClick={handleCreateMenu} disabled={!newMenu.name.trim()}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;